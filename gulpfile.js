var gulp = require('gulp');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var gutil = require('gulp-util');

var cssmin = require('gulp-minify-css');

var transform = require('vinyl-transform');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

var basePaths = {
  src:    'app/assets/',
  dest:   'app/static/'
};

// changeEvent = function(evt) {
//   gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
// };

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

  // gulp.watch('./assets/_scss/**/*.scss', ['sass']).on('change', function(evt) {
//     changeEvent(evt);
//   });
//   gulp.watch('./assets/_js/**/*.js', ['js-compile']).on('change', function(evt) {
//     changeEvent(evt);
//   });
});