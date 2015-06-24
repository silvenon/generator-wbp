var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('wbp') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'includeReact',
      message: 'Would you like to include React?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.features = props.features || [];

      this.props.features.forEach(function (feature) {
        this.props[feature] = true;
      }.bind(this));

      done();
    }.bind(this));
  },

  writing: {
    npm: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          includeReact: this.props.includeReact
        }
      );
    },

    jspm: function () {
      this.fs.copyTpl(
        this.templatePath('jspm-config.js'),
        this.destinationPath('app/jspm-config.js'),
        {
          includeReact: this.props.includeReact
        }
      );
    },

    tasks: function () {
      [
        'styles.js',
        'lint.js',
        'images.js',
        'dev.js',
        'test.js',
        'prod.js'
      ].forEach(function (filePath) {
        this.fs.copyTpl(
          this.templatePath('task/' + filePath),
          this.destinationPath('task/' + filePath),
          {
            includeReact: this.props.includeReact
          }
        );
      }.bind(this));

      this.fs.copy(
        this.templatePath('gulpfile.babel.js'),
        this.destinationPath('gulpfile.babel.js')
      );
    },

    markup: function () {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        {
          includeReact: this.props.includeReact
        }
      );
    },

    scripts: function () {
      [
        'helpers/fetch.js',
        'fonts.js'
      ].forEach(function (file) {
        this.fs.copy(
          this.templatePath('scripts/' + file),
          this.destinationPath('app/scripts/' + file)
        );
      }.bind(this));

      if (this.props.includeReact) {
        [
          'components/icon.jsx',
          'app.jsx'
        ].forEach(function (file) {
          this.fs.copy(
            this.templatePath('scripts/' + file),
            this.destinationPath('app/scripts/' + file)
          );
        }.bind(this));
      } else {
        this.fs.copy(
          this.templatePath('scripts/app.js'),
          this.destinationPath('app/scripts/app.js')
        );
      }
    },

    styles: function () {
      [
        '_variables.scss',
        '_functions.scss',
        '_mixins.scss',
        'vendor/_normalize.scss',
        '_base.scss',
        '_buttons.scss',
        '_forms.scss',
        'sections/_intro.scss',
        '_sections.scss',
        '_utilities.scss'
      ].forEach(function (file) {
        this.fs.copy(
          this.templatePath('styles/' + file),
          this.destinationPath('app/styles/' + file)
        );
      }.bind(this));

      this.fs.copyTpl(
        this.templatePath('styles/app.scss'),
        this.destinationPath('app/styles/app.scss'),
        {
          includeReact: this.props.includeReact
        }
      );
    },

    svg: function () {
      this.fs.copy(
        this.templatePath('images/icons.svg'),
        this.destinationPath('app/images/icons.svg')
      );
    },

    test: function () {
      [
        'client.js',
        'spec/test.js'
      ].forEach(function (file) {
        this.fs.copy(
          this.templatePath('test/' + file),
          this.destinationPath('test/' + file)
        );
      }.bind(this));

      this.fs.copyTpl(
        this.templatePath('test/fixtures/index.html'),
        this.destinationPath('test/fixtures/index.html'),
        {
          includeReact: this.props.includeReact
        }
      );
    },

    icons: function () {
      [
        'favicon.ico',
        'apple-touch-icon.png'
      ].forEach(function (file) {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath('app/' + file)
        );
      }.bind(this));
    },

    loaders: function () {
      if (this.props.includeReact) {
        this.fs.copy(
          this.templatePath('styles/vendor/_loaders.scss'),
          this.destinationPath('app/styles/vendor/_loaders.scss')
        );

        this.fs.copy(
          this.templatePath('scripts/components/loader.jsx'),
          this.destinationPath('app/scripts/components/loader.jsx')
        );
      }
    },

    dotfiles: function () {
      [
        'eslintrc',
        'eslintignore',
        'editorconfig',
        'gitignore'
      ].forEach(function (file) {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath('.' + file)
        );
      }.bind(this));
    }
  },

  install: function () {
    this.npmInstall();
    this.runInstall('jspm');
  }
});
