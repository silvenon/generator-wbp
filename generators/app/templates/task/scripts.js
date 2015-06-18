import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import bundle from './helpers/bundle';
import lint from './helpers/lint';

const $ = gulpLoadPlugins();

gulp.task('scripts', bundle);
gulp.task('lint', lint('app/scripts/**/*.js'));
