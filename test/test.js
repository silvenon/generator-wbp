import path from 'path';
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

    it('creates expected files', () => {
      assert.file('test/client.js');
      assert.file('test/fixtures/index.html');
      assert.file('test/spec/test.js');
    });

    it('has a container', () => {
      assert.fileContent('test/fixtures/index.html', 'id="content"');
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

    it('creates expected files', () => {
      assert.file('test/client.js');
      assert.file('test/fixtures/index.html');
      assert.file('test/spec/test.js');
    });

    it('doesn\'t have a container', () => {
      assert.noFileContent('test/fixtures/index.html', 'id="content"');
    });
  });
});
