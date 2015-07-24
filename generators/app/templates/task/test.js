import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = loadPlugins();
const bs = browserSync.create();

gulp.task('serve:test', ['styles'], done => {
  bs.init({
    logLevel: 'silent',
    notify: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['test/fixtures', 'dist']
    },
    ui: false
  }, done);
});

gulp.task('integration', 'serve:test', () => {
  return gulp.src('test/spec/**/*.js', {read: false})
    .pipe($.webdriver({
      desiredCapabilities: {
        browserName: 'phantomjs'
      },
      slow: 200 // integration tests are usually slower than unit tests
    }));
});

gulp.task('test', ['integration'], () => {
  bs.exit();
});
