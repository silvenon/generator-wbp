import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';

const $ = loadPlugins();
const bs = browserSync.create();

<% if (includeReact) { -%>
gulp.task('html', ['scripts', 'styles'], () => {
  gulp.src('app/index.html')
    .pipe(gulp.dest('dist'));

  return gulp.src([
<% } else { -%>
gulp.task('html', ['scripts', 'views', 'styles'], () => {
  return gulp.src([
    '.tmp/**/*.html',
<% } -%>
    '.tmp/scripts/*.js',
    '.tmp/styles/*.css'
  ], {base: '.tmp'})
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*'<% if (includeReact) { %>,
    '!app/index.html'<% } %>
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
