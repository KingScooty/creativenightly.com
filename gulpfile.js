var gulp = require('gulp');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var gutil = require('gulp-util');

var cssmin = require('gulp-minify-css');

var rename = require('gulp-rename');

var transform = require('vinyl-transform');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

var shell = require('gulp-shell');
var critical = require('critical');

var basePaths = {
  src:    'app/assets/',
  dest:   'app/static/'
};


gulp.task('sass', function () {
  gulp.src('./assets/_scss/main.scss')

    //Plumb pipe breaks incase of errors
    .pipe(plumber())

    .pipe(sass({
      style: 'compact'
    }))

    //Autoprefixer
    .pipe(prefix({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
      cascade: false
    }))

    .pipe(cssmin())

    .pipe(gulp.dest('./assets/stylesheets'));
});


gulp.task('js-compile', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src('./assets/_js/main.js')

    .pipe(plumber())
    .pipe(browserified)

    .pipe(uglify())

    .pipe(gulp.dest('./assets/javascripts/'));
});

gulp.task('watch', ['sass', 'js-compile'], function(){
  watch(['./assets/_scss/**/*.scss'], function() {
      gulp.start('sass');
  });

  watch(['./assets/_js/**/*.js'], function() {
      gulp.start('js-compile');
  });

});

gulp.task('jekyll', shell.task([
  'jekyll build'
]));

gulp.task('build', ['sass', 'js-compile'], 
  shell.task(['jekyll build']
));

// Copy our site styles to a site.css file
// for async loading later
gulp.task('copystyles', ['build'], function () {
    return gulp.src(['_site/assets/stylesheets/main.css'])
        .pipe(rename({
            basename: "site"
        }))
        .pipe(gulp.dest('_site/assets/stylesheets'));
});

// Generate & Inline Critical-path CSS
gulp.task('critical', ['build', 'copystyles'], function (cb) {

    // At this point, we have our
    // production styles in main/styles.css

    // As we're going to overwrite this with
    // our critical-path CSS let's create a copy
    // of our site-wide styles so we can async
    // load them in later. We do this with
    // 'copystyles' above

    critical.generate({
        base: '_site/',
        src: 'index.html',
        dest: 'assets/stylesheets/site.css',
        width: 320,
        height: 480,
        minify: true
    }, function(err, output){
        critical.inline({
            base: '_includes/',
            src: 'index.html',
            dest: 'index-critical.html',
            minify: true
        });        
    });
});
