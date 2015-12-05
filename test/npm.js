/*eslint-disable */
import path from 'path';
import { test as helpers } from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('webpack', () => {
  before((done) => {
    helpers.run(path.join(__dirname, '../src/app'))
      .withOptions({ skipInstall: true, includeReact: true })
      .on('end', done);
  });

  it('generates package.json', () => {
    assert.file('package.json');
  });

  it('checks if it contains dependencies', () => {
    const dep = {
      "dependencies": {
        "react": "^0.14.3",
        "react-addons-test-utils": "^0.14.3",
        "react-dom": "^0.14.3"
      }
    };

    assert.JSONFileContent('package.json', dep);
  });
  
  it('checks if it contains dev dependencies', () => {
    const devDep = {
      "devDependencies": {
        "babel-preset-react": "^6.0.15",
        "eslint-plugin-react": "^3.3.0",
        "react-hot-loader": "^1.2.9"
      },
    };
    assert.JSONFileContent('package.json', devDep);
  });
});
