import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('gulp tasks', () => {
  before((done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .on('end', done);
  });

  it('should contain the info about the generator', () => {
    assert.fileContent('gulpfile.babel.js', 'generator-wbp');
  });

  it('should contain development tasks', () => {
    assert.fileContent([
      ['task/dev.js', "gulp.task('scripts'"],
      ['task/dev.js', "gulp.task('styles'"],
      ['task/dev.js', "gulp.task('connect:dev'"],
      ['task/dev.js', "gulp.task('watch:dev'"],
      ['task/dev.js', "gulp.task('serve:dev'"],
      ['gulpfile.babel.js', 'task/dev']
    ]);
  });

  it('should contain production tasks', () => {
    assert.fileContent([
      ['task/prod.js', "gulp.task('html'"],
      ['task/prod.js', "gulp.task('images'"],
      ['task/prod.js', "gulp.task('extras'"],
      ['task/prod.js', "gulp.task('clean'"],
      ['task/prod.js', "gulp.task('build'"],
      ['task/prod.js', "gulp.task('default'"],
      ['task/prod.js', "gulp.task('serve:dist'"],
      ['gulpfile.babel.js', 'task/prod']
    ]);
  });

  describe('without react', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          includeReact: false
        })
        .on('end', done);
    });

    it('should contain testing tasks', () => {
      assert.fileContent([
        ['task/test.js', "gulp.task('serve:test'"],
        ['task/test.js', "gulp.task('integration'"],
        ['task/test.js', "gulp.task('test'"],
        ['gulpfile.babel.js', 'task/test']
      ]);
    });
  });
});
