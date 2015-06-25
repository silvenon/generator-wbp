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
      'app/config.js',
      'gulpfile.babel.js',
      'app/favicon.ico',
      'app/apple-touch-icon.png',
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

  it('creates valid json files', () => {
    assert(jsonlint.parse(fs.readFileSync('package.json', 'utf8')));
    assert(jsonlint.parse(fs.readFileSync('bower.json', 'utf8')));
    assert(jsonlint.parse(fs.readFileSync('.eslintrc', 'utf8')));
  });
});
