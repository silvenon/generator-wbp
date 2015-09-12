import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import http from 'http';
import connect from 'connect';
import serveStatic from 'serve-static';
import selenium from 'selenium-standalone';

const $ = loadPlugins();
let httpServer, seleniumServer;

gulp.task('serve:test', ['styles'], (done) => {
  const app = connect()
    .use(serveStatic('test/fixtures'))
    .use(serveStatic('dist'));

  httpServer = http.createServer(app);
  httpServer.listen(9000, done);
});

gulp.task('drivers', (done) => {
  selenium.install(done);
});

gulp.task('selenium', ['drivers'], (done) => {
  selenium.start((err, child) => {
    if (err) { return done(err); }
    seleniumServer = child;
    done();
  });
});

gulp.task('integration', ['serve:test', 'selenium'], (done) => {
  return gulp.src('wdio.conf.js')
    .pipe($.webdriver());
});

gulp.task('test', ['integration'], () => {
  httpServer.close();
  seleniumServer.kill();
});
