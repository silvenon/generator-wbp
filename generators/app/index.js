var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
  },

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
    docs: function () {
      this.fs.copyTpl(
        this.templatePath('readme.md'),
        this.destinationPath('readme.md'),
        {
          includeReact: this.props.includeReact
        }
      );
    },

    npm: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          includeReact: this.props.includeReact
        }
      );
    },

    tasks: function () {
      [
        'dev.js',
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

      if (!this.props.includeReact) {
        this.fs.copy(
          this.templatePath('task/test.js'),
          this.destinationPath('task/test.js')
        );
      }

      this.fs.copyTpl(
        this.templatePath('gulpfile.babel.js'),
        this.destinationPath('gulpfile.babel.js'),
        {
          name: this.pkg.name,
          version: this.pkg.version,
          includeReact: this.props.includeReact
        }
      );
    },

    data: function () {
      if (!this.props.includeReact) {
        this.fs.copy(
          this.templatePath('data/message.yml'),
          this.destinationPath('data/message.yml')
        );
      }
    },

    markup: function () {
      var layoutPath;

      if (this.props.includeReact) {
        layoutPath = 'app/index.html';
      } else {
        layoutPath = 'app/layouts/default.html';

        this.fs.copy(
          this.templatePath('views/index.html'),
          this.destinationPath('app/views/index.html')
        );
      }

      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath(layoutPath),
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
        '_demo.scss',
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
      var files;

      if (this.props.includeReact) {
        files = [
          'test/mocha.opts',
          'test/helpers/common.js',
          'test/spec/document.js',
          'test/spec/test.jsx'
        ];
      } else {
        files = [
          'wdio.conf.js',
          'test/fixtures/index.html',
          'test/spec/test.js'
        ];
      }

      files.forEach(function (file) {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(file)
        );
      }.bind(this));
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
        'travis.yml',
        'babelrc',
        'eslintrc',
        'eslintignore',
        'editorconfig',
        'gitignore'
      ].forEach(function (file) {
        this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath('.' + file),
          {
            includeReact: this.props.includeReact
          }
        );
      }.bind(this));
    }
  },

  install: function () {
    this.npmInstall();
  }
});
