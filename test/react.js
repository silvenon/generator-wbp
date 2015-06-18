import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('react', () => {
  describe('on', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          features: ['includeReact']
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

    it('sets the correct Browserify entry', () => {
      assert.fileContent('task/helpers/bundle.js', "'./app/scripts/app.jsx'");
    });
  });

  describe('off', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
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

    it('sets the correct Browserify entry', () => {
      assert.fileContent('task/helpers/bundle.js', "'./app/scripts/app.js'");
    });
  });
});
