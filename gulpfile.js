var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./assets/_scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./assets/stylesheets'));
});