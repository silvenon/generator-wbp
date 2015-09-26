import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('views', () => {
  describe('without react', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          includeReact: false
        })
        .on('end', done);
    });

    it('should have expected dependencies', () => {
      assert.fileContent([
        ['package.json', 'front-matter'],
        ['package.json', 'gulp-data'],
        ['package.json', 'gulp-template'],
        ['package.json', 'gulp-wrap'],
        ['package.json', 'yamljs']
      ]);
    });

    it('should have the views task', () => {
      assert.fileContent([
        ['task/dev.js', "gulp.task('views'"],
        ['task/dev.js', "['scripts', 'views', 'styles']"],
        ['task/prod.js', "['scripts', 'views', 'styles']"],
        ['readme.md', 'templating logic for views']
      ]);
      assert.noFileContent([
        ['task/dev.js', 'app/index.html'],
        ['task/prod.js', 'app/index.html']
      ]);
    });

    it('should have HTML templates', () => {
      assert.file([
        'app/views/index.html',
        'app/layouts/default.html'
      ]);
      assert.noFile('app/index.html');
    });

    it('should have YAML data', () => {
      assert.fileContent('task/dev.js', /ya?ml/i);
      assert.file('data/message.yml');
      assert.fileContent('app/views/index.html', '<%');
    });

    it('should use YAML front matter', () => {
      assert.fileContent('app/views/index.html', '---');
    });
  });

  describe('with react', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          includeReact: true
        })
        .on('end', done);
    });

    it('should do none of that stuff', () => {
      assert.fileContent([
        ['task/dev.js', "['scripts', 'styles']"],
        ['task/prod.js', "['scripts', 'styles']"],
        ['task/prod.js', 'app/index.html']
      ]);
      assert.noFileContent([
        ['package.json', 'front-matter'],
        ['package.json', 'gulp-data'],
        ['package.json', 'gulp-template'],
        ['package.json', 'gulp-wrap'],
        ['package.json', 'yamljs'],
        ['task/dev.js', "gulp.task('views'"],
        ['task/dev.js', /ya?ml/i],
        ['task/prod.js', '.tmp/**/*.html'],
        ['app/index.html', '<%'],
        ['readme.md', 'templating logic for views']
      ]);
      assert.noFile([
        'data/message.yml',
        'app/views/index.html',
        'app/layouts/default.html'
      ]);
      assert.file('app/index.html');
      assert.noFileContent('app/index.html', '---');
    });
  });
});
