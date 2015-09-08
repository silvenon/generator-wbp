import path from 'path';
import shell from 'shelljs';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('test', () => {
  describe('with React', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          includeReact: true
        })
        .on('end', done);
    });

    it('adds expected dependencies', () => {
      assert.fileContent('package.json', 'jsdom');
      assert.noFileContent('package.json', 'webdriverio');
      assert.noFileContent('package.json', 'selenium-standalone');
      assert.noFileContent('package.json', 'connect');
      assert.noFileContent('package.json', 'serve-static');
    });

    it('creates expected files', () => {
      assert.file('test/vendor/classList.js');
      assert.file('test/spec/document.js');
      assert.file('test/spec/test.jsx');
      assert.file('test/helpers/common.js');
      assert.noFile('wdio.conf.js');
    });

    it('runs the tests with Mocha CLI', () => {
      assert.fileContent('package.json', 'mocha test/spec');
      assert.file('test/mocha.opts');
      assert.noFile('task/test.js');
      assert.noFileContent('gulpfile.babel.js', 'task/test');
      assert.noFileContent('package.json', 'gulp test');
    });

    it('uses React with addons everywhere', () => {
      shell.find(['app/scripts', 'test'])
        .filter((file) => file.match(/\.jsx$/))
        .forEach((file) => assert.noFileContent(file, "'react'"));
    });

    it('doesn\'t install PhantomJS v2 on Travis CI', () => {
      assert.noFileContent('.travis.yml', 'phantomjs');
    });
  });

  describe('without React', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          includeReact: false
        })
        .on('end', done);
    });

    it('adds expected dependencies', () => {
      assert.fileContent('package.json', 'webdriverio');
      assert.fileContent('package.json', 'selenium-standalone');
      assert.fileContent('package.json', 'connect');
      assert.fileContent('package.json', 'serve-static');
      assert.noFileContent('package.json', 'jsdom');
    });

    it('creates expected files', () => {
      assert.file('wdio.conf.js');
      assert.file('test/fixtures/index.html');
      assert.file('test/spec/test.js');
      assert.noFile('test/helpers/common.js');
      assert.noFile('test/spec/test.jsx');
    });

    it('runs the tests with gulp', () => {
      assert.file('task/test.js');
      assert.fileContent('gulpfile.babel.js', 'task/test');
      assert.fileContent('package.json', 'gulp test');
      assert.noFileContent('package.json', 'mocha test/spec');
      assert.noFile('test/mocha.opts');
    });

    it('installs PhantomJS v2 on Travis CI', () => {
      assert.fileContent('.travis.yml', 'phantomjs');
    });
  });
});
