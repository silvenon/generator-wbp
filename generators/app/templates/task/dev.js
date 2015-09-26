import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import flexbugs from 'postcss-flexbugs-fixes';
import autoprefixer from 'autoprefixer';
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
<% if (!includeReact) { -%>
import fs from 'fs';
import path from 'path';
import YAML from 'yamljs';
import fm from 'front-matter';
<% } -%>

const $ = loadPlugins();
const bs = browserSync.create();

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
    .on('error', (msg) => {
      delete msg.stream;
      $.util.log(msg);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(bs.stream({once: true}));
}

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

<% if (!includeReact) { -%>
gulp.task('views', () => {
  // à la Data Files in Jekyll
  // http://jekyllrb.com/docs/datafiles/
  let data = {};
  fs.readdirSync('./data').forEach((file) => {
    data[path.basename(file, '.yml')] = YAML.load(`data/${file}`);
  });

  return gulp.src('app/views/**/*.html')
    .pipe($.plumber())
    .pipe($.data({site: {data: data}}))
    .pipe($.data((file) => {
      let content = fm(String(file.contents));
      file.contents = new Buffer(content.body);
      return {page: content.attributes};
    }))
    .pipe($.template())
    .pipe($.wrap({src: 'app/layouts/default.html'}))
    .pipe(gulp.dest('.tmp'))
    .pipe(bs.stream({once: true}));
});
<% } -%>

gulp.task('styles', () => {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync()).on('error', $.sass.logError)
    .pipe($.postcss([
      flexbugs,
      autoprefixer
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(bs.stream());
});

<% if (includeReact) { -%>
gulp.task('connect:dev', ['scripts', 'styles'], (done) => {
<% } else { -%>
gulp.task('connect:dev', ['scripts', 'views', 'styles'], (done) => {
<% } -%>
  bs.init({
    notify: false,
    port: 9000,
    open: false,
    server: {
      // the order is important, this way files in .tmp
      // will get precedence in case of a name clash
      baseDir: ['.tmp', 'app']
    }
  }, done);
});

gulp.task('watch:dev', ['connect:dev'], () => {
  gulp.watch([
<% if (includeReact) { -%>
    'app/index.html',
<% } -%>
    'app/images/**/*'
  ]).on('change', bs.reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
<% if (!includeReact) { -%>
  gulp.watch([
    'app/**/*.html',
    'data/**/*.yml'
  ], ['views']);
<% } -%>
});

gulp.task('serve:dev', ['connect:dev', 'watch:dev']);
