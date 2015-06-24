import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import selenium from 'selenium-standalone';

const $ = gulpLoadPlugins();
const bs = browserSync.create();

// run Mocha with ES2015
import 'babel/register';

gulp.task('serve:test', ['styles'], (done) => {
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

gulp.task('selenium', function (done) {
  selenium.install({
    drivers: {},
    logger: function () { }
  }, function (installErr) {
    if (installErr) { return done(installErr); }
    selenium.start({
      drivers: {}
    }, function (startErr, child) {
      if (startErr) { return done(startErr); }
      if (process.env.TRAVIS) {
        child.stderr.on('data', function(data){
          console.log(data.toString());
        });
      }
      selenium.child = child;
      done();
    });
  });
});

gulp.task('integration', ['serve:test', 'selenium'], function () {
  return gulp.src('test/spec/**/*.js', {read: false})
    .pipe($.mocha({timeout: 10000}))
    .once('error', function () {
      process.env.MOCHA_ERR = true;
    })
    .once('end', function () {
      if (process.env.MOCHA_ERR) {
        throw new Error();
      }
    });
});

gulp.task('test', ['integration'], function () {
  global.client.end();
  selenium.child.kill();
  bs.exit();
});
