import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import selenium from 'selenium-standalone';
import lint from './helpers/lint';

const $ = gulpLoadPlugins();

// run Mocha with ES2015
import 'babel/register';

gulp.task('lint:test', lint('test/spec/**/*.js'));

gulp.task('serve:test', ['scripts', 'styles'], (done) => {
  browserSync({
    logLevel: 'silent',
    notify: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['test/fixtures', '.tmp', 'app']
    },
    ui: false
  }, done);
});

gulp.task('selenium', function (done) {
  selenium.install({
    drivers: {},
    logger: function () { }
  }, function (err) {
    if (err) return done(err);
    selenium.start({
      drivers: {}
    }, function (err, child) {
      if (err) return done(err);
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
        process.exit(1);
      }
    });
});

gulp.task('test', ['integration'], function () {
  global.client.end();
  selenium.child.kill();
  browserSync.exit();
});
