import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('loader', () => {
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
      assert.file([
        'app/styles/vendor/_loaders.scss',
        'app/scripts/components/loader.jsx'
      ]);
    });

    it('loads the stylesheet', () => {
      assert.fileContent('app/styles/app.scss', 'vendor/loaders');
    });

    it('styles the loader', () => {
      assert.fileContent('app/index.html', '.loader');
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

    it('doesn\'t create files', () => {
      assert.noFile([
        'app/styles/vendor/_loaders.scss',
        'app/scripts/components/loader.jsx'
      ]);
    });

    it('doesn\'t load the stylesheet', () => {
      assert.noFileContent('app/styles/app.scss', 'vendor/loaders');
    });

    it('doesn\'t style the loader', () => {
      assert.noFileContent('app/index.html', '.loader');
    });
  });
});
