import gulp from 'gulp';
import $ from './helpers/plugins';
import {test as server} from './helpers/server';
import selenium from 'selenium-standalone';

gulp.task('serve:test', ['styles'], done => {
  server.init({
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

gulp.task('selenium', done => {
  selenium.install({
    drivers: {},
    logger: function () { }
  }, installErr => {
    if (installErr) { return done(installErr); }
    selenium.start({
      drivers: {}
    }, (startErr, child) => {
      if (startErr) { return done(startErr); }
      if (process.env.TRAVIS) {
        child.stderr.on('data', data => {
          console.log(data.toString());
        });
      }
      selenium.child = child;
      done();
    });
  });
});

gulp.task('integration', ['serve:test', 'selenium'], () => {
  return gulp.src('test/spec/**/*.js', {read: false})
    .pipe($.mocha({timeout: 10000}))
    .once('error', () => {
      process.env.MOCHA_ERR = true;
    })
    .once('end', () => {
      if (process.env.MOCHA_ERR) {
        throw new Error();
      }
    });
});

gulp.task('test', ['integration'], () => {
  global.client.end();
  selenium.child.kill();
  server.exit();
});
