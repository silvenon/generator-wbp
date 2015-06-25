import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('react', () => {
  describe('on', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          includeReact: true
        })
        .on('end', done);
    });

    it('adds dependencies', () => {
      assert.fileContent('package.json', '"react"');
      assert.fileContent('package.json', '"react-portal"');
      assert.fileContent('package.json', '"react-router"');
    });

    it('creates expected files', () => {
      assert.file('app/scripts/app.jsx');
      assert.file('app/scripts/components/icon.jsx');
      assert.noFile('app/scripts/app.js');
    });

    it('uses correct extensions in the tasks', () => {
      assert.fileContent('task/lint.js', 'app/scripts/**/*.{js,jsx}');
      assert.fileContent('task/dev.js', 'app/scripts/**/*.{js,jsx}');
    });

    it('adds correct HTML', () => {
      assert.fileContent('app/index.html', 'id="content"');
    });
  });

  describe('off', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          includeReact: false
        })
        .on('end', done);
    });

    it('doesn\'t add dependencies', () => {
      assert.noFileContent('package.json', '"react"');
    });

    it('creates expected files', () => {
      assert.file('app/scripts/app.js');
      assert.noFile('app/scripts/components/icon.jsx');
      assert.noFile('app/scripts/app.jsx');
    });

    it('uses correct extensions in the tasks', () => {
      assert.fileContent('task/lint.js', 'app/scripts/**/*.js');
      assert.fileContent('task/dev.js', 'app/scripts/**/*.js');
    });

    it('adds correct HTML', () => {
      assert.fileContent('app/index.html', 'class="container"');
    });
  });
});
