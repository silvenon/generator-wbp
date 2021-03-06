# generator-wbp ![not maintained](https://img.shields.io/badge/maintained-no-lightgrey.svg) [![Travis CI](https://travis-ci.org/silvenon/generator-wbp.svg)](https://travis-ci.org/silvenon/generator-wbp)

**Deprecated**: this generator was a way for me to start React projects more quickly. However, I since started using the awesome [create-react-app], so I won't be maintaining this project anymore. I suggest you check it out!

---

> A [Yeoman] generator which provides a modern workflow for developing web apps and sites.

Heavily inspired by [generator-gulp-webapp], but far more opinionated. I want to make this generator as hardcore as it can be, starting a new project should be a breeze.

## Features

  * [gulp] for running tasks
  * [browserify] for loading node modules on the front-end, with the following plugins:
    - [babelify] for transforming JavaScript with [Babel]
    - [browserify-shim] for shimming scripts which don't follow a module pattern
    - easily include more [browserify plugins]
  * [BrowserSync] for running the local server (it's loaded with features)
  * [React] (optional) for managing views, with the following plugins:
    - [React Router] for managing routes
    - [React Portal] for handling things like modals
  * templating logic for views (if the `React` option is off) featuring:
    - [YAML front matter] available under `page.var`
    - data files available under `site.data.filename.var`, similar to [Jekyll][data files] (currently supports only YAML)
    - [Lo-Dash templating]
  * [Fetch API polyfill] wrapped as a convenience helper
  * [FontFaceObserver] for [reducing FOIT][font-events] when using webfonts
  * [ESLint] for JS & JSX linting, with the following plugins:
    - [eslint-plugin-react] for fine-grained React-savvy JSX linting
    - easily include more [ESLint plugins]
  * [Sass] for CSS pre-processing (using [libsass])
  * [PostCSS] for CSS post-processing, with the following plugins:
    - [postcss-flexbugs-fixes] for fixing some of the [flexbugs]
    - [autoprefixer] for adding vendor prefixes
    - easily include more [PostCSS plugins]
  * [sourcemaps] for JS & CSS
  * [Normalize.css] for normalizing styles across browsers
  * [imagemin] for image optimization
  * [SVG][svg-symbol] for icons (`<symbol>` + `<use>`) + [polyfill][svg4everybody] for IE
  * [CSS loader] component for React
  * [Mocha] as the test framework
  * [jsdom] for React testing (with [TestUtils])
  * [WebdriverIO] as Node.js bindings for Selenium (if the `React` option is off)
  * [PhantomJS] as the browser for testing with WebdriverIO, so make sure you have it installed

See the current [roadmap].

`.babelrc` is where you can set your Babel options globally, it will be picked up by both babel and babelify.

## Getting Started

Install [yo] and generator-wbp globally:

```sh
❯ npm install --global yo generator-wbp
```

Now create a new directory for your project:

```sh
❯ mkdir my-webapp
❯ cd my-webapp
```

and run the generator to start scaffolding and installing dependencies:

```sh
❯ yo wbp
```

## Scripts

There are some shortcut scripts in the [package.json] that you can run [using npm][scripts]. There are a couple of benefits to this:

  * it's usually shorter to type
  * if I happen to switch to another task runner, the npm scripts will stay the same
  * when run like this, the `gulp` command actually uses the local gulp, so we don't have to worry about local and global versions matching or even installing it globally
  * we don't have to create a gulp task for other shell commands, like deployment in our case

**Side note**: I'm not entirely sure that it's ok to use npm scripts this way, but we're not going to be publishing the generated "package" (which is why `private` is set to `true`), so we might as well abuse them.

Start the local server at [http://localhost:9000](http://localhost:9000) and watch files for changes:

```sh
❯ npm start
```

Run tests:

```sh
❯ npm test
```

Make a compressed production-ready build:

```sh
❯ npm run build
```

Preview the build, make sure nothing is broken:

```sh
❯ npm run preview
```

Deploy to S3 using [AWS CLI]:

```sh
❯ npm run deploy
```

This script needs to be adjusted according to your S3 data, or replace it with another script if you're deploying to somewhere else.

## Contributing

See the [contributing docs](contributing.md), interesting stuff.

## License

MIT © Matija Marohnić

[create-react-app]: https://github.com/facebookincubator/create-react-app
[webpack]: http://webpack.github.io/
[yeoman]: http://yeoman.io/
[generator-gulp-webapp]: https://github.com/yeoman/generator-gulp-webapp
[gulp]: http://gulpjs.com/
[browserify]: http://browserify.org/
[babelify]: https://github.com/babel/babelify
[babel]: https://babeljs.io/
[browserify-shim]: https://github.com/thlorenz/browserify-shim
[browserify plugins]: https://github.com/substack/node-browserify/wiki/list-of-transforms
[browsersync]: http://www.browsersync.io/
[react]: https://facebook.github.io/react/
[react router]: http://rackt.github.io/react-router/
[react portal]: https://github.com/tajo/react-portal
[yaml front matter]: https://github.com/jxson/front-matter
[data files]: http://jekyllrb.com/docs/datafiles/
[lo-dash templating]: https://github.com/sindresorhus/gulp-template
[fetch api polyfill]: https://github.com/github/fetch
[fontfaceobserver]: https://github.com/bramstein/fontfaceobserver
[font-events]: http://www.filamentgroup.com/lab/font-events.html
[eslint]: http://eslint.org/
[eslint-plugin-react]: https://github.com/yannickcr/eslint-plugin-react
[eslint plugins]: https://github.com/search?q=eslint-plugin&ref=opensearch
[sass]: http://sass-lang.com/
[libsass]: http://libsass.org/
[postcss]: https://github.com/postcss/postcss
[postcss-flexbugs-fixes]: https://github.com/luisrudge/postcss-flexbugs-fixes
[flexbugs]: https://github.com/philipwalton/flexbugs
[autoprefixer]: https://github.com/postcss/autoprefixer
[postcss plugins]: https://github.com/postcss/postcss#plugins
[sourcemaps]: http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
[normalize.css]: http://necolas.github.io/normalize.css/
[imagemin]: https://github.com/imagemin/imagemin
[svg-symbol]: https://css-tricks.com/svg-symbol-good-choice-icons/
[svg4everybody]: https://github.com/jonathantneal/svg4everybody
[css loader]: http://connoratherton.com/loaders
[mocha]: http://mochajs.org/
[jsdom]: https://github.com/tmpvar/jsdom
[testutils]: https://facebook.github.io/react/docs/test-utils.html
[webdriverio]: http://webdriver.io/
[phantomjs]: http://phantomjs.org/
[roadmap]: https://github.com/silvenon/generator-wbp/labels/enhancement
[yo]: https://github.com/yeoman/yo
[package.json]: generators/app/templates/_package.json
[scripts]: https://docs.npmjs.com/files/package.json#scripts
[aws cli]: http://aws.amazon.com/cli/
