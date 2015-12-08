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

// Imported via plugins too, but cleaner syntax referencing directly.
var gulpif = require('gulp-if');

var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

// var shell = require('gulp-shell');
var critical = require('critical');

// var manifest = require('gulp-manifest');

var basePaths = {
  src:    'app/assets/',
  dest:   'app/static/'
};









// JEKYLL
//


// current
// gulp.task('jekyll', plugins.shell.task([
//   'jekyll build'
// ]));



// new
var jekyllEnv = {
  dev: 'app/_config.yml,app/_config.dev.yml',
  production: 'app/_config.yml'
}

var jekyllBuild = function jekyllBuild(jekyllEnv, done) {
  return plugins.spawn('bundle', ['exec', 'jekyll', 'build', '--source', 'app', '--destination', '_site', '--plugins', 'plugins', '--config', jekyllEnv], { stdio: 'inherit' }).on('close', done);
}

gulp.task('jekyll-build-dev', function( done ) {
  jekyllBuild(jekyllEnv.dev, done);
});

gulp.task('jekyll-build-production', function( done ) {
  jekyllBuild(jekyllEnv.production, done);
});

gulp.task('jekyll-reload', ['jekyll-build-dev'], function() {
  plugins.browserSync.reload();
});











// BROWSER SYNC
//

gulp.task('browser-sync', ['sass-development', 'jekyll-build-dev'], function() {

  plugins.browserSync({
    ui: false,
    server: {
      baseDir: ['_site', '.temp']
    },
    ghostMode: false,
    online: false,
    notify: false
  });

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

    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())

    .pipe(plugins.browserSync.reload({ stream: true }))
    .pipe(gulp.dest('.temp/assets/css'));

  return task;
}

var sass_production = function sass_production() {
  var nano_options = {
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Android >= 2.3']
      },
      discardComments: { removeAll: true }
    }
  };

  var task = gulp
    .src( 'app/assets/_scss/*.scss')
    .pipe(plugins.plumber())

    .pipe(sass.sync().on('error', sass.logError))
    .pipe(plugins.nano(nano_options))
    .pipe( gulp.dest( '_site/assets/css' ) )

  return task;
}


gulp.task('sass-development', function() {
  return sass_development();
});

gulp.task('sass-production', ['jekyll-build-production'], function() {
  return sass_production();
});










// JAVASCRIPT
//


gulp.task('js-development', function() {
  var b = browserify({
    // entries: './assets/_js/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('assets/_js/main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('.temp/assets/js/'));
});


gulp.task('js-production', ['jekyll-build-production'], function() {
  var b = browserify({
    // entries: './assets/_js/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('assets/_js/main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('_site/assets/js/'));
});















// WATCH TASKS
//

gulp.task('watch', function() {

  gulp.watch('app/assets/_scss/**/*.scss', ['sass-development']);
  gulp.watch('app/assets/_js/**/*.js', ['js-development']);
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
  ], ['jekyll-reload']);

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















// BUILD
//


gulp.task('build', ['sass-production', 'js-production', 'jekyll-build-production']);













// Copy our site styles to a site.css file
// for async loading later
// gulp.task('copystyles', ['build'], function () {
//   return gulp.src(['_site/assets/stylesheets/main.css'])
//     .pipe(plugins.rename({
//       basename: "site"
//     }))
//     .pipe(gulp.dest('_site/assets/stylesheets'));
// });















// CRITICAL PATH CSS
//


// Generate & Inline Critical-path CSS
gulp.task('critical', ['build', 'copystyles'], function (cb) {

  // At this point, we have our
  // production styles in main/styles.css

  // As we're going to overwrite this with
  // our critical-path CSS let's create a copy
  // of our site-wide styles so we can async
  // load them in later. We do this with
  // 'copystyles' above

  critical.generateInline({
    base: '_site/',
    src: 'index.html',
    styleTarget: 'assets/stylesheets/main.css',
    htmlTarget: 'index.html',
    width: 320,
    height: 480,
    minify: true
  }, function(err, output) {
    cb(err);
  });

});

gulp.task('generate-critical-partials', ['critical'], function() {
  console.log('Generating correct partial');
  gulp.src('_site/assets/stylesheets/main.css')
    .pipe(plugins.rename({
      basename: '_critical-path',
      extname: '.html'
    }))
    .pipe(gulp.dest('./_includes/'));

  console.log('Partial _critical-path.html ready!');

  gulp.src('_site/assets/stylesheets/site.css')
    .pipe(gulp.dest('./assets/stylesheets/'));

  console.log('Site wide CSS ready!');
});










// CACHE MANIFEST
//


gulp.task('manifest', ['critical', 'generate-critical-partials'], function(){
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


gulp.task('production', ['critical', 'generate-critical-partials' /*, 'manifest'*/]);


gulp.task('jekyll-build-production', function( done ) {
  jekyllBuild(jekyllEnv.production, done);
});


gulp.task('sass-production', ['jekyll-build-production'], function() {
  return compileSass();
});




// DEPLOY
//
// Stagger build to ensure compiled css drops into _site folder after jekyll
// build.


gulp.task('deploy', ['sass-production', 'jekyll-build-production'], function() {

  return gulp
    .src('_site/**/*')
    .pipe(plugins.ghPages());

});





// DEFAULT
// - `gulp`

gulp.task('default', ['browser-sync', 'watch']);
