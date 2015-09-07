import gulp from 'gulp';
import http from 'http';
import connect from 'connect';
import serveStatic from 'serve-static';
import selenium from 'selenium-standalone';
import {spawn} from 'child_process';

let httpServer, seleniumServer;

gulp.task('serve:test', ['styles'], done => {
  const app = connect()
    .use(serveStatic('test/fixtures'))
    .use(serveStatic('dist'));

  httpServer = http.createServer(app);
  httpServer.listen(9000, done);
});

gulp.task('selenium', done => {
  selenium.install(installErr => {
    if (installErr) { return done(installErr); }
    selenium.start((startErr, child) => {
      if (startErr) { return done(startErr); }
      seleniumServer = child;
      done();
    });
  });
});

gulp.task('integration', ['serve:test', 'selenium'], done => {
  spawn('node_modules/.bin/wdio', {
    stdio: 'inherit'
  }).on('exit', code => {
    done();
  });
});

gulp.task('test', ['integration'], () => {
  httpServer.close();
  seleniumServer.kill();
});
