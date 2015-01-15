var gulp = require('gulp');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

// changeEvent = function(evt) {
//     gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
// };

gulp.task('sass', function () {
  gulp.src('./assets/_scss/*.scss')

    //Plumb pipe breaks incase of errors
    .pipe(plumber())

    .pipe(sass())

    //Autoprefixer
    .pipe(prefix({
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        cascade: false
    }))

    .pipe(gulp.dest('./assets/stylesheets'));
});


//Watch task built for speed in development
gulp.task('sass-watch', function() {
  watch('./assets/_scss/**/*.scss')

    //Plumb pipe breaks incase of errors
    .pipe(plumber())

    .pipe(sass())

    .pipe(gulp.dest('./assets/stylesheets'));
});

// gulp.task('sass-watch', ['sass'], function(){
//   gulp.watch('./assets/_scss/*.scss', ['sass']).on('change', function(evt) {
//       changeEvent(evt);
//   });
// });