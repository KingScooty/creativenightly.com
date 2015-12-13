var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();

plugins.browserSync = require('browser-sync');
plugins.spawn       = require('child_process').spawn;

// var plumber = require('gulp-plumber');
// var prefix = require('gulp-autoprefixer');
// var sass = require('gulp-sass');
// var watch = require('gulp-watch');
// var gutil = require('gulp-util');

// var cssmin = require('gulp-minify-css');

// var rename = require('gulp-rename');

var del = require('del');

var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var runSequence = require('run-sequence');

var uglify = require('gulp-uglify');



// var shell = require('gulp-shell');
var critical = require('critical');

// var manifest = require('gulp-manifest');

// var basePaths = {
//   src:    'app/assets/',
//   dest:   'app/static/'
// };









// JEKYLL
//


// current
// gulp.task('jekyll', plugins.shell.task([
//   'jekyll build'
// ]));



// new
var jekyllEnv = {
  dev: {
    env: 'development',
    config: 'app/_config.yml,app/_config.dev.yml'
  },
  production: {
    env: 'production',
    config: 'app/_config.yml'
  }
}

var jekyllBuild = function jekyllBuild(jekyllEnv, done, destination) {

  if (!destination) {
    destination = '_site';
  }

  var environment_variables = Object.create(process.env);
  environment_variables.JEKYLL_ENV = jekyllEnv.env;

  return plugins.spawn(
    //'bundle',
    'jekyll',
    [
      // 'exec',
      // 'JEKYLL_ENV=' + jekyllEnv.env,
      //'jekyll',
      'build',
      '--source', 'app',
      '--destination', destination,
      '--plugins', 'plugins',
      '--config', jekyllEnv.config
    ],
    {
      env: environment_variables,
      stdio: 'inherit'
    }
  ).on('close', done);
}

gulp.task('jekyll:dev', function( done ) {
  jekyllBuild(jekyllEnv.dev, done);
});

gulp.task('jekyll:production:pre', function( done ) {
  jekyllBuild(jekyllEnv.dev, done, '.temp/production/');
});

gulp.task('jekyll:production:post', function( done ) {
  jekyllBuild(jekyllEnv.production, done);
});

gulp.task('jekyll:reload', ['jekyll:dev'], function() {
  plugins.browserSync.reload();
});











// BROWSER SYNC
//

gulp.task('browser-sync', ['sass:development', 'jekyll:dev'], function() {

  plugins.browserSync({
    ui: false,
    server: {
      baseDir: ['_site', '.temp/development']
    },
    ghostMode: false,
    online: false,
    notify: false
  });

});







// CLEAN TEMP
//

gulp.task('clean:development', function () {
  return del([
    '.temp/development/**/*'
  ]);
});

gulp.task('clean:production', function () {
  return del([
    '.temp/production/**/*'
  ]);
});





// SASS
//


// gulp.task('sass', function () {
//   gulp.src('./assets/_scss/main.scss')
//
//     //Plumb pipe breaks incase of errors
//     .pipe(plugins.plumber())
//
//     .pipe(plugins.sass({
//       style: 'compact'
//     }))
//
//     //Autoprefixer
//     .pipe(prefix({
//       browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
//       cascade: false
//     }))
//
//     .pipe(cssmin())
//
//     .pipe(gulp.dest('./assets/stylesheets'));
// });
//



var sass_development = function sass_development() {
  var task = gulp
    .src( 'app/assets/_scss/*.scss')
    .pipe(plugins.plumber())

    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass.sync().on('error', plugins.sass.logError))
    .pipe(plugins.sourcemaps.write())

    .pipe(plugins.browserSync.reload({ stream: true }))
    .pipe(gulp.dest('.temp/development/assets/css'));

  return task;
}

var sass_production = function sass_production() {
  var nano_options = {
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Android >= 2.3']
    },
    discardComments: { removeAll: true }
  };

  var task = gulp
    .src( 'app/assets/_scss/*.scss')
    .pipe(plugins.plumber())

    .pipe(plugins.sass.sync().on('error', plugins.sass.logError))
    .pipe(plugins.cssnano(nano_options))
  // Output to both _site and temp for crticial path
    // .pipe( gulp.dest( '_site/assets/css' ) )
    .pipe( gulp.dest( '.temp/production/assets/css' ) );

  return task;
}


gulp.task('sass:development', function() {
  return sass_development();
});

gulp.task('sass:production', function() {
  return sass_production();
});










// JAVASCRIPT
//


gulp.task('js:development', function() {
  var b = browserify({
    entries: './app/assets/_js/main.js',
    debug: true
  });

  return b.bundle()
  // Source is the *name* of the outputted file from browserify
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
      .on('error', plugins.util.log)
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('.temp/development/assets/js/'));
});


gulp.task('js:production', function() {
  var b = browserify({
    entries: './app/assets/_js/main.js',
    debug: true
  });

  return b.bundle()
  // Source is the *name* of the outputted file from browserify
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
  // Output to both _site and temp for crticial path
    // .pipe(gulp.dest('_site/assets/js/'))
    .pipe(gulp.dest('.temp/production/assets/js/'));
});


// assets:dev
// assets:production

gulp.task('assets:dev', ['sass:development', 'js:development']);
gulp.task('assets:production', ['sass:production', 'js:production']);













// WATCH TASKS
//

gulp.task('watch', function() {

  gulp.watch('app/assets/_scss/**/*.scss', ['sass:development']);
  gulp.watch('app/assets/_js/**/*.js', ['js:development']);
  gulp.watch([
    // 'app/_components/**/*.html',
    'app/_includes/**/*.html',
    'app/_includes/**/*.md',
    'app/_layouts/**/*.html',
    'app/_pagetypes/**/*.html',
    'app/pages/*.html',
    'app/assets/css/*.css',
    'app/assets/images/*.{svg,png,jpg}',
    'app/assets/svg/*.svg',
    // 'app/{.,atoms,molecules,organisms}/index.html',
    // 'app/{.,atoms,molecules,organisms}/index.html',
    'app/_data/*.yml'
    // '_includes/**/*.html',
    // '_layouts/*.html',
    // 'img/**/*',
    // 'js/main.js'
  ], ['jekyll:reload']);

});


// gulp.task('watch', ['sass', 'js-compile'], function(){
//   plugins.watch(['./assets/_scss/**/*.scss'], function() {
//       gulp.start('sass');
//   });
//
//   plugins.watch(['./assets/_js/**/*.js'], function() {
//       gulp.start('js-compile');
//   });
//
// });




























// CRITICAL PATH CSS
//



// optimise:critical-path:pre
// optimise:critical-path:generate
// optimise:critical-path:post
//optimise:critical-path



// Duplicate main.css and rename it to site.css
// This file will be loaded async on page load
gulp.task('optimise:critical-path:pre', function () {
  // return gulp.src(['_site/assets/css/main.css'])
  return gulp.src(['.temp/production/assets/css/main.css'])
    .pipe(plugins.rename({
      basename: "site"
    }))
    // .pipe(gulp.dest('_site/assets/css'));
    .pipe(gulp.dest('.temp/production/assets/css'));
});


// Generate & Inline Critical-path CSS
gulp.task('optimise:critical-path:generate', function (cb) {

  // At this point, we have our
  // production styles in main/styles.css

  // As we're going to overwrite this with
  // our critical-path CSS let's create a copy
  // of our site-wide styles so we can async
  // load them in later. We do this with
  // 'optimise:critical-path:pre' above

  // critical.generateInline({
  critical.generate({
    // base: '_site/'
    // inline: true,
    base: '.temp/production/',
    src: 'index.html',
    // pathPrefix: '.temp/production/',
    // dest: '.temp/production/assets/css/site.css',
    css: ['.temp/production/assets/css/main.css'],
    // styleTarget: '.temp/production/assets/css/critical.css',
    dest: '.temp/production/assets/css/critical.css',
    // htmlTarget: 'index.html',
    dimensions: [{
      width: 320,
      height: 480
    },{
      width: 768,
      height: 1024
    },{
      width: 1280,
      height: 960
    }],
    // extract: true,
    minify: true
  }, function(err, output) {
    cb(err);
  });

});

// Hmmm, this actually generates a partial, that needs to be used *before*
// the jekyll build task finishes everything off. Hmm. Hmm. Hmm.

// Originally, jekyll build would go first, then the assets would fill
// in the generated folders.

// With this task, we'll output the stuff to a temp folder, generate the
// critical path template, then build jekyll, and move the temp files over.

/**

0. Compile jekyll in pre production mode (env: dev / path: .temp/production)

1. Clear temp/production folder.
2. Output sass production to temp/production
3. Output js production to temp/production

4. Copy and rename compiled css file from main.css to site.css
4. Copy index.html over to temp/production

!! Critical path spins up a server to see what is visible in the sized viewport.
-  Jekyll build production will have to run twice?? (See step 0.)

4. Generate critical path and output critical.css
5. Copy and rename critical.css to _critical-path.html and place it in
   app/includes/.temp/_critical-path.html
6. Compile jekyll production to _site

7. Cache manifest?
8. Deploy

*/

gulp.task('optimise:critical-path:post', function() {
  console.log('Generating correct partial');
  gulp.src('.temp/production/assets/css/critical.css')
    .pipe(plugins.rename({
      basename: '_critical-path',
      extname: '.html'
    }))
    .pipe(gulp.dest('./app/_includes/.temp/'));

  console.log('Partial _critical-path.html ready!');

  gulp.src('.temp/production/assets/css/site.css')
    .pipe(gulp.dest('./app/assets/css/'));

  gulp.src('.temp/production/assets/js/main.js')
    .pipe(gulp.dest('./app/assets/js/'));

  console.log('Site wide CSS ready!');
});



// copy js and css to app/assets/css
gulp.task('cleanup:post-production', function() {

  return del([
    'app/assets/css',
    'app/assets/js'
  ]);

});

gulp.task('optimise:critical-path', function(callback) {
  runSequence('optimise:critical-path:pre',
              'optimise:critical-path:generate',
              'optimise:critical-path:post',
              callback);
});


// CACHE MANIFEST
//


gulp.task('manifest', ['optimise:critical-path:generate', 'optimise:critical-path:post'], function(){
  gulp.src(['_site/**/*'])
    .pipe(plugins.manifest({
      hash: true,
      preferOnline: true,
      network: ['http://*', 'https://*', '*'],
      filename: 'cache.manifest',
      exclude: [
        'cache.manifest',
        'googleacfe19709071df8d.html',
        'Gemfile',
        'Gemfile.lock',
        'CNAME',
        'robots.txt',
        'sitemap.xml',
        'feed.xml'
      ],
      timestamp: false
     }))
    .pipe(gulp.dest('./'));
});















// PRODUCTION
//

// Tasks

// jekyll:dev
// jekyll:production:pre
// jekyll:production:post
// jekyll:reload

// sass:dev
// sass:production
// js:dev
// js:production
// assets:dev
// assets:production

// optimise:critical-path:pre
// optimise:critical-path:generate
// optimise:critical-path:post
//optimise:critical-path
// optimise:manifest

// build:all--production
//

// deploy
// deploy:test

gulp.task('production', function(callback) {
  runSequence('jekyll:production:pre',
              'assets:production',
              // 'optimise:critical-path',
              //'manifest',
              callback);
});

// gulp.task('finalise', ['optimise:critical-path:generate', 'optimise:critical-path:post'], function() {
//   jekyllBuild(jekyllEnv.production, done);
// })

// gulp.task('jekyll:production:pre', function( done ) {
//   jekyllBuild(jekyllEnv.production, done);
// });


// gulp.task('sass:production', ['jekyll:production:pre'], function() {
//   return compileSass();
// });




// DEPLOY
//
// Stagger build to ensure compiled css drops into _site folder after jekyll
// build.


gulp.task('deploy', ['production', 'jekyll:production:post'], function() {

  return gulp
    .src('_site/**/*')
    .pipe(plugins.ghPages());

});

gulp.task('deploy:test', ['production', 'jekyll:production:post']);






// DEFAULT
// - `gulp`

gulp.task('default', ['browser-sync', 'watch']);
