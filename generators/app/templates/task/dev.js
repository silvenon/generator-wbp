import gulp from 'gulp';
import {dev as server} from './helpers/server';

gulp.task('connect:dev', ['scripts', 'styles'], done => {
  server.init({
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
    'app/index.html',
    'app/images/**/*'
  ]).on('change', server.reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
});

gulp.task('serve:dev', ['connect:dev', 'watch:dev']);
