# My Project

This project was scaffolded with [generator-wbp].

## Features

  * [gulp] for running tasks
  * [browserify] for loading node modules on the front-end, with the following plugins:
    - [babelify] for transforming JavaScript with [Babel]
    - [browserify-shim] for shimming scripts which don't follow a module pattern
    - easily include more [browserify plugins]
  * [BrowserSync] for running the local server (it's loaded with features)
<% if (includeReact) { -%>
  * [React] for managing views, with the following plugins:
    - [React Router] for managing routes
    - [React Portal] for handling things like modals
<% } -%>
  * [Fetch API polyfill] wrapped as a convenience helper
  * [FontFaceObserver] for [reducing FOIT][font-events] when using webfonts
  * [ESLint] for JS & JSX linting (if you are using [Atom], I highly recommend [linter-eslint])
  * [Sass] for CSS pre-processing (using [libsass])
  * [PostCSS] for CSS post-processing, with the following plugins:
    - [postcss-flexbugs-fixes] for fixing some of the [flexbugs]
    - [autoprefixer] for adding vendor prefixes
    - easily include more [PostCSS plugins]
  * JS & CSS [sourcemaps]
  * [Normalize.css] for normalizing styles across browsers
  * [imagemin] for image optimization
  * [SVG][svg-symbol] for icons (`<symbol>` + `<use>`) + [polyfill][svg4everybody] for IE
<% if (includeReact) { -%>
  * [CSS loader] component for React
<% } -%>
  * [Mocha] as the test framework
<% if (includeReact) { -%>
  * [jsdom] for React testing (with [TestUtils])
<% } else { -%>
  * [WebdriverIO] as Node.js bindings for Selenium
<% } -%>

`.babelrc` is where you can set your Babel options globally, it will be picked up by both babel-core and babelify.

## Usage

There are some shortcut scripts in the [package.json] that you can run [using npm][scripts].

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

[generator-wbp]: https://github.com/silvenon/generator-wbp
[gulp]: http://gulpjs.com/
[browserify]: http://browserify.org/
[babelify]: https://github.com/babel/babelify
[babel]: https://babeljs.io/
[browserify-shim]: https://github.com/thlorenz/browserify-shim
[browserify plugins]: https://github.com/substack/node-browserify/wiki/list-of-transforms
[browsersync]: http://www.browsersync.io/
<% if (includeReact) { -%>
[react]: https://facebook.github.io/react/
[react router]: http://rackt.github.io/react-router/
[react portal]: https://github.com/tajo/react-portal
<% } -%>
[fetch api polyfill]: https://github.com/github/fetch
[fontfaceobserver]: https://github.com/bramstein/fontfaceobserver
[font-events]: http://www.filamentgroup.com/lab/font-events.html
[eslint]: http://eslint.org/
[atom]: https://atom.io/
[linter-eslint]: https://atom.io/packages/linter-eslint
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
<% if (includeReact) { -%>
[testutils]: https://facebook.github.io/react/docs/test-utils.html
<% } else { -%>
[webdriverio]: http://webdriver.io/
<% } -%>
[package.json]: package.json
[aws cli]: http://aws.amazon.com/cli/
