import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';

const $ = gulpLoadPlugins();

gulp.task('html', ['scripts', 'styles'], () => {
  gulp.src('app/**/*.html')
    .pipe($.minifyHtml({conditionals: true, loose: true}))
    .pipe(gulp.dest('dist'));

  return gulp.src([
    '.tmp/scripts/*.js',
    '.tmp/styles/*.css'
  ], {base: '.tmp'})
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(gulp.dest('dist'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {dot: true})
    .pipe(gulp.dest('dist'));
});

gulp.task('connect:dist', (done) => {
  browserSync({
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
