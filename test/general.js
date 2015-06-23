import fs from 'fs';
import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';
import jsonlint from 'jsonlint';

describe('general', () => {
  before((done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .withPrompts({
        includeReact: true
      })
      .on('end', done);
  });

  it('creates expected files', () => {
    assert.file([
      'package.json',
      'gulpfile.babel.js',
      'app/favicon.ico',
      'app/apple-touch-icon.png',
      'app/scripts/vendor/svg4everybody.js',
      'app/scripts/helpers/fetch.js',
      'app/scripts/fonts.js',
      'app/images/icons.svg',
      'app/index.html',
      '.eslintrc',
      '.eslintignore',
      '.editorconfig',
      '.gitignore'
    ]);
  });

  it('creates a valid package.json', () => {
    assert(jsonlint.parse(fs.readFileSync('package.json', 'utf8')));
  });
});
