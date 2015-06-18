import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import autoprefixer from 'autoprefixer-core';

const $ = gulpLoadPlugins();

gulp.task('styles', () => {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync()).on('error', $.sass.logError)
    .pipe($.postcss([autoprefixer]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(browserSync.stream());
});
