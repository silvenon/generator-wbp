import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import bundle from './helpers/bundle';
import lint from './helpers/lint';

const $ = gulpLoadPlugins();
const bs = browserSync.create('dev');

gulp.task('scripts', bundle(bs));
gulp.task('lint', lint('app/scripts/**/*.js', bs));
