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
<% } else { -%>
  * templating logic for views featuring:
    - [YAML front matter] available under `page.var`
    - data files available under `site.data.filename.var`, similar to [Jekyll][data files] (currently supports only YAML)
    - [Lo-Dash templating]
<% } -%>
  * [Fetch API polyfill] wrapped as a convenience helper
  * [FontFaceObserver] for [reducing FOIT][font-events] when using webfonts
  * [ESLint] for JS & JSX linting<% if (includeReact) { %>, with the following plugins:
    - [eslint-plugin-react] for fine-grained React-savvy JSX linting
    - easily include more [ESLint plugins]<% } %>
  * [Sass] for CSS pre-processing (using [libsass])
  * [PostCSS] for CSS post-processing, with the following plugins:
    - [postcss-flexbugs-fixes] for fixing some of the [flexbugs]
    - [autoprefixer] for adding vendor prefixes
    - easily include more [PostCSS plugins]
  * [sourcemaps] JS & CSS
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
  * [PhantomJS] as the browser for testing with WebdriverIO, so make sure you have it installed
<% } -%>

`.babelrc` is where you can set your Babel options globally, it will be picked up by both babel and babelify.

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
<% } else { -%>
[yaml front matter]: https://github.com/jxson/front-matter
[data files]: http://jekyllrb.com/docs/datafiles/
[lo-dash templating]: https://github.com/sindresorhus/gulp-template
<% } -%>
[fetch api polyfill]: https://github.com/github/fetch
[fontfaceobserver]: https://github.com/bramstein/fontfaceobserver
[font-events]: http://www.filamentgroup.com/lab/font-events.html
[eslint]: http://eslint.org/
<% if (includeReact) { -%>
[eslint-plugin-react]: https://github.com/yannickcr/eslint-plugin-react
[eslint plugins]: https://github.com/search?q=eslint-plugin&ref=opensearch
<% } -%>
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
[phantomjs]: http://phantomjs.org/
<% } -%>
[package.json]: package.json
[aws cli]: http://aws.amazon.com/cli/
