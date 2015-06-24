import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('jspm', () => {
  describe('with React', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          includeReact: true
        })
        .on('end', done);
    });

    it('defaults to extension .jsx', () => {
      assert.fileContent('app/jspm-config.js', '"jsx"');
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

    it('defaults to extension .js', () => {
      assert.fileContent('app/jspm-config.js', '"js"');
    });
  });
});
