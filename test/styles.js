import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('styles', () => {
  before((done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .on('end', done);
  });

  it('should have expected files', () => {
    assert.file([
      'app/styles/vendor/_normalize.scss',
      'app/styles/_variables.scss',
      'app/styles/_functions.scss',
      'app/styles/_mixins.scss',
      'app/styles/_base.scss',
      'app/styles/_demo.scss',
      'app/styles/_buttons.scss',
      'app/styles/_forms.scss',
      'app/styles/sections/_intro.scss',
      'app/styles/_sections.scss',
      'app/styles/_utilities.scss',
      'app/styles/app.scss'
    ]);
  });
});
