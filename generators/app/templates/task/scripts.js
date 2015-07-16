import gulp from 'gulp';
import $ from './helpers/plugins';
import {dev as server} from './helpers/server';

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

const bundle = function () {
  return b.bundle()
    .on('error', msg => {
      delete msg.stream;
      $.util.log(msg);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(server.stream({once: true}));
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
