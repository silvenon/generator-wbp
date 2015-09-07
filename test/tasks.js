import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('gulp tasks', () => {
  before(done => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .on('end', done);
  });

  it('contains the info about the generator', () => {
    assert.fileContent('gulpfile.babel.js', 'generator-wbp');
  });

  it('contains development tasks', () => {
    assert.fileContent('task/dev.js', "gulp.task('scripts'");
    assert.fileContent('task/dev.js', "gulp.task('lint'");
    assert.fileContent('task/dev.js', "gulp.task('styles'");
    assert.fileContent('task/dev.js', "gulp.task('connect:dev'");
    assert.fileContent('task/dev.js', "gulp.task('watch:dev'");
    assert.fileContent('task/dev.js', "gulp.task('serve:dev'");
    assert.fileContent('gulpfile.babel.js', 'task/dev');
  });

  it('contains production tasks', () => {
    assert.fileContent('task/prod.js', "gulp.task('html'");
    assert.fileContent('task/prod.js', "gulp.task('images'");
    assert.fileContent('task/prod.js', "gulp.task('extras'");
    assert.fileContent('task/prod.js', "gulp.task('clean'");
    assert.fileContent('task/prod.js', "gulp.task('build'");
    assert.fileContent('task/prod.js', "gulp.task('default'");
    assert.fileContent('task/prod.js', "gulp.task('serve:dist'");
    assert.fileContent('gulpfile.babel.js', 'task/prod');
  });

  describe('without React', () => {
    before(done => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          includeReact: false
        })
        .on('end', done);
    });

    it('contains testing tasks', () => {
      assert.fileContent('task/test.js', "gulp.task('serve:test'");
      assert.fileContent('task/test.js', "gulp.task('integration'");
      assert.fileContent('task/test.js', "gulp.task('test'");
      assert.fileContent('gulpfile.babel.js', 'task/test');
    });
  });
});
