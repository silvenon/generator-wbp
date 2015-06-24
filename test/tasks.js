import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('gulp tasks', () => {
  before((done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .withPrompts({
        includeReact: true
      })
      .on('end', done);
  });

  it('creates expected files', () => {
    assert.file([
      'task/helpers/bundle.js',
      'task/helpers/lint.js',
      'task/styles.js',
      'task/scripts.js',
      'task/images.js',
      'task/dev.js',
      'task/test.js',
      'task/prod.js'
    ])
  });

  it('contains script tasks', () => {
    assert.fileContent('task/scripts.js', "gulp.task('scripts'");
    assert.fileContent('task/scripts.js', "gulp.task('lint'");
  });

  it('contains style tasks', () => {
    assert.fileContent('task/styles.js', "gulp.task('styles'");
  });

  it('contains image tasks', () => {
    assert.fileContent('task/images.js', "gulp.task('images'");
  });

  it('contains development tasks', () => {
    assert.fileContent('task/dev.js', "gulp.task('connect:dev'");
    assert.fileContent('task/dev.js', "gulp.task('watch:dev'");
    assert.fileContent('task/dev.js', "gulp.task('serve:dev'");
  });

  it('contains testing tasks', () => {
    assert.fileContent('task/test.js', "gulp.task('lint:test'");
    assert.noFileContent('task/test.js', "gulp.task('connect:test'");
    assert.noFileContent('task/test.js', "gulp.task('watch:test'");
    assert.fileContent('task/test.js', "gulp.task('serve:test'");
    assert.fileContent('task/test.js', "gulp.task('selenium'");
    assert.fileContent('task/test.js', "gulp.task('integration'");
    assert.fileContent('task/test.js', "gulp.task('test'");
  });

  it('contains production tasks', () => {
    assert.fileContent('task/prod.js', "gulp.task('html'");
    assert.fileContent('task/prod.js', "gulp.task('extras'");
    assert.fileContent('task/prod.js', "gulp.task('clean'");
    assert.fileContent('task/prod.js', "gulp.task('build'");
    assert.fileContent('task/prod.js', "gulp.task('default'");
    assert.noFileContent('task/prod.js', "gulp.task('connect:dist'");
    assert.noFileContent('task/prod.js', "gulp.task('watch:dist'");
    assert.fileContent('task/prod.js', "gulp.task('serve:dist'");
  });
});
