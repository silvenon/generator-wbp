import gulp from 'gulp';
import $ from './helpers/plugins';
import {dev as server} from './helpers/server';
import autoprefixer from 'autoprefixer-core';

gulp.task('styles', () => {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync()).on('error', $.sass.logError)
    .pipe($.postcss([autoprefixer]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(server.stream());
});
