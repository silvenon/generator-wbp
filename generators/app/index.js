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
    tasks: function () {
      [
        'task/helpers/bundle.js',
        'task/helpers/lint.js',
        'task/scripts.js',
        'task/styles.js',
        'task/images.js',
        'task/dev.js',
        'task/test.js',
        'task/prod.js',
        'gulpfile.babel.js'
      ].forEach(function (filePath) {
        this.fs.copyTpl(
          this.templatePath(filePath),
          this.destinationPath(filePath),
          {
            includeReact: this.props.includeReact
          }
        );
      }.bind(this));
    },

    markup: function () {
      this.fs.copyTpl(
        this.templatePath('app/index.html'),
        this.destinationPath('app/index.html'),
        {
          includeReact: this.props.includeReact
        }
      );
    },

    scripts: function () {
      var ext = this.props.includeReact ? '.jsx' : '.js';

      [
        'app/scripts/vendor/svg4everybody.js',
        'app/scripts/helpers/fetch.js',
        'app/scripts/fonts.js'
      ].forEach(function (file) {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(file)
        );
      }.bind(this));

      if (this.props.includeReact) {
        [
          'app/scripts/components/icon.jsx',
          'app/scripts/app.jsx'
        ].forEach(function (file) {
          this.fs.copy(
            this.templatePath(file),
            this.destinationPath(file)
          );
        }.bind(this));
      } else {
        [
          'app/scripts/app.js'
        ].forEach(function (file) {
          this.fs.copy(
            this.templatePath(file),
            this.destinationPath(file)
          );
        }.bind(this));
      }
    },

    styles: function () {
      [
        'app/styles/_variables.scss',
        'app/styles/_functions.scss',
        'app/styles/_mixins.scss',
        'app/styles/vendor/_normalize.scss',
        'app/styles/_base.scss',
        'app/styles/_buttons.scss',
        'app/styles/_forms.scss',
        'app/styles/sections/_intro.scss',
        'app/styles/_sections.scss',
        'app/styles/_utilities.scss'
      ].forEach(function (file) {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(file)
        );
      }.bind(this));

      this.fs.copyTpl(
        this.templatePath('app/styles/app.scss'),
        this.destinationPath('app/styles/app.scss'),
        {
          includeReact: this.props.includeReact
        }
      );
    },

    svg: function () {
      this.fs.copy(
        this.templatePath('app/images/icons.svg'),
        this.destinationPath('app/images/icons.svg')
      );
    },

    deps: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          includeReact: this.props.includeReact
        }
      );
    },

    test: function () {
      [
        'test/client.js',
        'test/fixtures/index.html',
        'test/spec/test.js'
      ].forEach(function (file) {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(file)
        );
      }.bind(this));
    },

    icons: function () {
      [
        'app/favicon.ico',
        'app/apple-touch-icon.png'
      ].forEach(function (file) {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(file)
        );
      }.bind(this));
    },

    loaders: function () {
      if (this.props.includeReact) {
        this.fs.copy(
          this.templatePath('app/styles/vendor/_loaders.scss'),
          this.destinationPath('app/styles/vendor/_loaders.scss')
        );

        this.fs.copy(
          this.templatePath('app/scripts/components/loader.jsx'),
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
    this.installDependencies({bower: false});
  }
});
