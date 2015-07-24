import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = loadPlugins();
const bs = browserSync.create();

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';

let b = browserify({
<% if (includeReact) { -%>
  entries: ['./app/scripts/app.jsx'],
  extensions: ['.jsx'],
<% } else { -%>
  entries: ['./app/scripts/app.js'],
<% } -%>
  debug: true
}, watchify.args);

// only watch for changes in development mode
if (process.env.GULP_ENV !== 'production') {
  b = watchify(b);
}

function bundle() {
  return b.bundle()
    .on('error', msg => {
      delete msg.stream;
      $.util.log(msg);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(bs.stream({once: true}));
};

gulp.task('scripts', bundle);
b.on('update', bundle);

gulp.task('lint', () => {
  return gulp.src([
<% if (includeReact) { -%>
    'app/scripts/**/*.{js,jsx}',
    'test/**/*.{js,jsx}',
<% } else { -%>
    'app/scripts/**/*.js',
    'test/**/*.js',
<% } -%>
    'task/**/*.js'
  ])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('styles', () => {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync()).on('error', $.sass.logError)
    .pipe($.postcss([autoprefixer]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(bs.stream());
});

gulp.task('connect:dev', ['scripts', 'styles'], done => {
  bs.init({
    notify: false,
    port: 9000,
    open: false,
    server: {
      baseDir: ['.tmp', 'app']
    }
  }, done);
});

gulp.task('watch:dev', ['connect:dev'], () => {
  gulp.watch([
    'app/index.html',
    'app/images/**/*'
  ]).on('change', bs.reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
});

gulp.task('serve:dev', ['connect:dev', 'watch:dev']);
