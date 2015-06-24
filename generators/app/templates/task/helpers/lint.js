import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

export default function (files, bs) {
  return () => {
    return gulp.src(files)
      .pipe(bs.stream({once: true}))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.if(!bs.active, $.eslint.failAfterError()));
  };
}
