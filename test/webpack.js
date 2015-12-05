import path from 'path';
import { test as helpers } from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('webpack', () => {
  before((done) => {
    helpers.run(path.join(__dirname, '../src/app'))
      .withOptions({ skipInstall: true, includeReact: true })
      .on('end', done);
  });

  it('generates configuration files', () => {
    assert.file([
      'webpack.config.js',
      'cfg/base.js',
      'cfg/dev.js',
      'cfg/prod.js',
      'cfg/test.js',
      'server.js'
    ]);
  });
});
