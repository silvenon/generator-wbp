import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import jspm from 'jspm';
import del from 'del';

const $ = gulpLoadPlugins();
const bs = browserSync.create();

gulp.task('bundle', () => {
  return jspm.bundleSFX('scripts/app', './dist/scripts/app.js', {
    minify: true,
    mangle: true,
    sourceMaps: false
  });
});

gulp.task('html', ['bundle', 'styles'], () => {
  gulp.src('app/index.html')
    .pipe($.htmlReplace({js: 'scripts/app.js'}))
    .pipe($.minifyHtml({conditionals: true, loose: true}))
    .pipe(gulp.dest('dist'));

  return gulp.src('.tmp/styles/*.css')
    .pipe($.minifyCss({compatibility: '*'}))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/index.html'
  ], {dot: true})
    .pipe(gulp.dest('dist'));
});

gulp.task('serve:dist', (done) => {
  bs.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    },
    ui: false
  }, done);
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('build', ['lint', 'html', 'images', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
