import gulp from 'gulp';
import browserSync from 'browser-sync';

gulp.task('connect:dev', ['scripts', 'styles'], (done) => {
  browserSync({
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
  ]).on('change', browserSync.reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
});

gulp.task('serve:dev', ['connect:dev', 'watch:dev']);
