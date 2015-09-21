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

    it('should have expected dependencies', () => {
      assert.fileContent([
        ['package.json', '"react"'],
        ['package.json', '"react-portal"'],
        ['package.json', '"react-router"']
      ]);
    });

    it('should have expected files', () => {
      assert.file([
        'app/scripts/app.jsx',
        'app/scripts/components/icon.jsx'
      ]);
      assert.noFile('app/scripts/app.js');
    });

    it('should use correct ESLint options', () => {
      assert.fileContent('.eslintrc', 'jsx');
      assert.noFileContent('.eslintrc', 'globals');
    });

    it('should use correct extensions in the tasks', () => {
      assert.fileContent('task/dev.js', '.{js,jsx}');
    });

    it('should have correct HTML', () => {
      assert.fileContent('app/index.html', 'id="content"');
    });

    it('should have correct docs', () => {
      assert.fileContent('readme.md', /React/i);
      assert.noFileContent('readme.md', /WebdriverIO/i);
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

    it('should have expected dependencies', () => {
      assert.noFileContent('package.json', 'react');
    });

    it('should have expected files', () => {
      assert.file('app/scripts/app.js');
      assert.noFile([
        ['app/scripts/components/icon.jsx'],
        ['app/scripts/app.jsx']
      ]);
    });

    it('should use correct ESLint options', () => {
      assert.fileContent('.eslintrc', 'globals');
      assert.noFileContent('.eslintrc', 'jsx');
    });

    it('should use correct extensions in the tasks', () => {
      assert.fileContent('task/dev.js', '.js');
      assert.noFileContent('task/dev.js', 'jsx');
    });

    it('should have correct HTML', () => {
      assert.fileContent('app/index.html', 'class="container"');
    });

    it('should have correct docs', () => {
      assert.noFileContent('readme.md', /React/i);
      assert.fileContent('readme.md', /WebdriverIO/i);
    });
  });
});
