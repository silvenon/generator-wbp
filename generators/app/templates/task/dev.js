import gulp from 'gulp';
import browserSync from 'browser-sync';

const bs = browserSync.get('dev');

gulp.task('connect:dev', ['scripts', 'styles'], (done) => {
  bs.init({
    notify: false,
    port: 9000,
    open: false,
    server: {
      baseDir: ['.tmp', 'app']
    }
  }, done);
});

gulp.task('watch:dev', ['connect:dev'], function () {
  gulp.watch([
    'app/**/*.html',
    'app/images/**/*'
  ]).on('change', bs.reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
});

gulp.task('serve:dev', ['connect:dev', 'watch:dev']);
