import generator from 'yeoman-generator';

module.exports = generator.Base.extend({
  initializing() {
    this.pkg = require('../../package.json');
  },

  prompting() {
    const done = this.async();

    const prompts = [{
      type: 'confirm',
      name: 'includeReact',
      message: 'Would you like to use React?',
      default: true
    }];

    this.prompt(prompts, (props) => {
      this.props = props;
      done();
    });
  },

  writing: {
    webpack() {
      [
        'webpack.config.js',
        'cfg/base.js',
        'cfg/dev.js',
        'cfg/prod.js',
        'cfg/test.js',
        'server.js'
      ].forEach((file) => {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(file)
        );
      });
    }
  },

  install() {
    this.npmInstall();
  }
});
