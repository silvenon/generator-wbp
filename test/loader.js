import path from 'path';
import {test as helpers} from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('loader', () => {
  describe('with react', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          includeReact: true
        })
        .on('end', done);
    });

    it('should have expected files', () => {
      assert.file([
        'app/styles/vendor/_loaders.scss',
        'app/scripts/components/loader.jsx'
      ]);
    });

    it('should load the stylesheet', () => {
      assert.fileContent('app/styles/app.scss', 'vendor/loaders');
    });

    it('should style the loader', () => {
      assert.fileContent('app/index.html', '.loader');
    });
  });

  describe('without react', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({skipInstall: true})
        .withPrompts({
          includeReact: false
        })
        .on('end', done);
    });

    it('should do none of that stuff', () => {
      assert.noFile([
        ['app/styles/vendor/_loaders.scss'],
        ['app/scripts/components/loader.jsx']
      ]);
      assert.noFileContent([
        ['app/styles/app.scss', 'vendor/loaders'],
        ['app/index.html', '.loader']
      ]);
    });
  });
});
