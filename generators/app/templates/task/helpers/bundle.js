import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const $ = gulpLoadPlugins();

let b = browserify({
<% if (includeReact) { -%>
  entries: ['./app/scripts/app.jsx'],
  extensions: ['.jsx'],
<% } else { -%>
  entries: ['./app/scripts/app.js'],
<% } -%>
  debug: true
}, watchify.args);

if (process.env.GULP_ENV === 'development') {
  b = watchify(b);
}

export default function bundle() {
  return b.bundle()
    .on('error', function (msg) {
      delete msg.stream; // delete the annoying stack trace
      $.util.log(msg);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(browserSync.stream({once: true}));
};

b.on('update', bundle);
b.on('log', $.util.log);
