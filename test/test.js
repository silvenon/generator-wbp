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
    });

    it('creates expected files', () => {
      assert.file('test/vendor/classList.js');
      assert.file('test/helpers/common.js');
      assert.file('test/spec/document.js');
      assert.file('test/spec/test.jsx');
    });

    it('runs the tests with Mocha CLI', () => {
      assert.fileContent('package.json', '"mocha"');
      assert.fileContent('package.json', 'mocha test/spec');
      assert.file('test/mocha.opts');
    });

    it('uses React with addons everywhere', () => {
      shell.find(['app/scripts', 'test'])
        .filter(file => file.match(/\.jsx$/))
        .forEach(file => assert.noFileContent(file, "'react'"));
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
      assert.fileContent('package.json', 'selenium-standalone');
      assert.fileContent('package.json', 'webdriverio');
      assert.fileContent('package.json', 'webdrivercss');
      assert.noFileContent('package.json', 'jsdom');
    });

    it('runs the tests with gulp', () => {
      assert.file('task/test.js');
      assert.fileContent('gulpfile.babel.js', 'task/test');
      assert.fileContent('package.json', '"gulp-mocha"');
      assert.fileContent('package.json', 'gulp test');
    });

    it('creates expected files', () => {
      assert.file('test/helpers/client.js');
      assert.file('test/fixtures/index.html');
      assert.file('test/spec/test.js');
      assert.noFile('test/spec/test.jsx');
    });

    it('installs PhantomJS v2 on Travis CI', () => {
      assert.fileContent('.travis.yml', 'phantomjs');
    });
  });
});
