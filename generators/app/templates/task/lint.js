import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();
const bs = browserSync.get('dev');

function lint(files) {
  return () => {
    return gulp.src(files)
      .pipe(bs.stream({once: true}))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.if(!bs.active, $.eslint.failAfterError()));
  };
}

gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js'));
