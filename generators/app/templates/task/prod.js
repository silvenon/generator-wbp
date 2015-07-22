import gulp from 'gulp';
import $ from './helpers/plugins';
import {prod as server} from './helpers/server';
import del from 'del';

gulp.task('html', ['scripts', 'styles'], () => {
  gulp.src('app/index.html')
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
    '!app/index.html'
  ], {dot: true})
    .pipe(gulp.dest('dist'));
});

gulp.task('serve:dist', done => {
  server.init({
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
