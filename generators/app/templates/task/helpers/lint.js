import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();

export default function (files) {
  return () => {
    return gulp.src(files)
      .pipe(browserSync.stream({once: true}))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
