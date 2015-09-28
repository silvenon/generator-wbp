import path from 'path';
import shell from 'shelljs';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('tests', () => {
  describe('with react', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          includeReact: true
        })
        .on('end', done);
    });

    it('should have expected dependencies', () => {
      assert.fileContent('package.json', 'jsdom');
      assert.noFileContent([
        ['package.json', 'webdriver'],
        ['package.json', 'selenium-standalone'],
        ['package.json', 'connect'],
        ['package.json', 'serve-static']
      ]);
    });

    it('should have expected files', () => {
      assert.file([
        'test/spec/document.js',
        'test/spec/test.jsx',
        'test/helpers/common.js'
      ]);
      assert.noFile('wdio.conf.js');
    });

    it('should run the tests with Mocha CLI', () => {
      assert.fileContent('package.json', 'mocha test/spec');
      assert.file('test/mocha.opts');
      assert.noFile('task/test.js');
      assert.noFileContent([
        ['gulpfile.babel.js', 'task/test'],
        ['package.json', 'gulp test']
      ]);
    });

    it('should use react with addons everywhere', () => {
      shell.find(['app/scripts', 'test'])
        .filter((file) => file.match(/\.jsx$/))
        .forEach((file) => assert.noFileContent(file, "'react'"));
    });

    it('should not test with PhantomJS', () => {
      assert.noFileContent('.travis.yml', 'phantomjs');
    });
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

    it('should have expected dependencies', () => {
      assert.fileContent([
        ['package.json', 'webdriver'],
        ['package.json', 'selenium-standalone'],
        ['package.json', 'connect'],
        ['package.json', 'serve-static']
      ]);
      assert.noFileContent('package.json', 'jsdom');
    });

    it('should have expected files', () => {
      assert.file([
        'wdio.conf.js',
        'test/fixtures/index.html',
        'test/spec/test.js'
      ]);
      assert.noFile([
        'test/helpers/common.js',
        'test/spec/test.jsx'
      ]);
    });

    it('should run the tests with gulp', () => {
      assert.file('task/test.js');
      assert.fileContent([
        ['gulpfile.babel.js', 'task/test'],
        ['package.json', 'gulp test']
      ]);
      assert.noFileContent('package.json', 'mocha test/spec');
      assert.noFile('test/mocha.opts');
    });

    it('should test with PhantomJS', () => {
      assert.fileContent('.travis.yml', 'phantomjs');
    });
  });
});
