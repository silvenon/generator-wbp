import fs from 'fs';
import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';
import jsonlint from 'jsonlint';

describe('general', () => {
  before((done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .on('end', done);
  });

  it('creates expected files', () => {
    assert.file([
      'package.json',
      'gulpfile.babel.js',
      'task/styles.js',
      'task/lint.js',
      'task/images.js',
      'task/dev.js',
      'task/prod.js',
      'app/jspm-config.js',
      'app/favicon.ico',
      'app/apple-touch-icon.png',
      'app/scripts/helpers/fetch.js',
      'app/scripts/fonts.js',
      'app/images/icons.svg',
      'app/index.html',
      '.travis.yml',
      '.babelrc',
      '.eslintrc',
      '.eslintignore',
      '.editorconfig',
      '.gitignore'
    ]);
  });

  it('creates valid json files', () => {
    assert(jsonlint.parse(fs.readFileSync('package.json', 'utf8')));
    assert(jsonlint.parse(fs.readFileSync('.babelrc', 'utf8')));
    assert(jsonlint.parse(fs.readFileSync('.eslintrc', 'utf8')));
  });
});
