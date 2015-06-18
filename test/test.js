import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('test', () => {
  before((done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .on('end', done);
  });

  it('creates expected files', () => {
    assert.file('test/client.js');
    assert.file('test/fixtures/index.html');
    assert.file('test/spec/test.js');
  });
});
