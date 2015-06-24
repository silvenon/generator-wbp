import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
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

function bundle(bs) {
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
    .pipe(bs.stream({once: true}));
}

b.on('update', bundle);
b.on('log', $.util.log);

export default function (bs) {
  return bundle.bind(this, bs);
}
