# Contributing

Go crazy with suggestions and requests, I'm listening. I created this generator for myself and my purposes, which means that I'll be maintaining it regularly (until a better tool comes along).

I want to make this generator a collection of best practices and I will do my best to document why I made certain choices.

## [gulp]

In comparison to [Grunt], gulp:

  * is faster
  * requires less code
  * is easier to read
  * doesn't always require plugins ([1st guideline])

There are other interesting tools rising, like [Broccoli], but I'm not sure if any of them are mature enough, so for now I'm sticking to gulp.

## [browserify]

I started consuming packages with [Bower] + [wiredep], but I needed more control and better authoring experience, so I switched to [browserify]. It offers a nice node-like `require()`, which makes organizing code very easy.

### [jspm]

I tried jspm out because it has lots of nice features:

  * does a lot with very little setup
  * uses [SystemJS], a standards-compliant and future-friendly module loader
  * can pull from any registry (npm, GitHub…)
  * supports all module formats (ES6, CommonJS, AMD, UMD…)
  * supports mapping (e.g. [whatwg-fetch] can be imported as `fetch`)
  * supports overriding module's `package.json`
  * doesn't require recompilation during development
  * can optimize code for production in advanced ways
  * many more awesome features that I don't even know about

[This][jspm-video] video is a nice intro to jspm.

But I found it too advanced for me and it was starting to get in the way, so I switched back. Until I learn to tame it or find a better alternative, I'm sticking to browserify.

### [webpack]

I still haven't tried webpack, but I hear nice things about it.

## [Bootstrap]

I think Bootstrap is great, it's very well-coded, works great accross browsers, has a strong community and, unlike many other frameworks, encourages accessibility and has it built-in!

The reason why I chose **not** to include it is because everyone has their own UI preferences and it's very likely Bootstrap will not handle something the way you want, which is limiting and annoying. I think Bootstrap is an excellent learning resource, but not really a good idea to use it directly in projects where you need advanced UI control.

## [React]

I chose React among other frameworks because it's:

  * simple to understand and use
  * unobtrusive, i.e. can be combined with other frameworks (if you're into that)
  * easy to start with, Babel has built-in JSX support
  * very easy and fast to test

It worked great for me so far and is the only one which I kinda-sorta mastered.

I made it optional because there is a good chance you'll want something else, and removing it manually each time isn't trivial.

### ES2015 Classes

Currently using ES2015 classes with React doesn't really offer any advantages, only limitations—we are unable to use mixins, we have to bind `this` to every custom method etc. That's why I'm using the [React.createClass] method instead.

## [Sass]

I'm aware that other CSS pre-processors exist, but Sass has the strongest community and is blazing fast, now that [libsass] is a thing.

## [PostCSS]

It's a CSS post-processor, meaning that it should ideally process more-or-less valid CSS. [Autoprefixer] is a great example of a PostCSS plugin, you can pretend like you're writing CSS for the perfect browser, while it takes care of all the prefixes.

Because I'm using [gulp-postcss] and not [gulp-autoprefixer] directly, you are free to add any number of [PostCSS plugins], just `require()` them and add them to the array of processors.

## [SVG]

I find SVG a much better choice for icons over icon fonts. [This post][svg-vs-font] by Chris Coyier explains it very well, but basically:

  * much smaller file size
  * more semantic
  * better accessibility
  * no anti-aliasing issues
  * no spacing issues
  * multiple colors
  * more styling control
  * advanced animation capabilities
  * etc.

The method that worked best for me is `<symbol>` + `<use>`, read more about it [here][svg-symbol].

## [WebdriverIO]

It's more advanced, has nicer API and is better-documented than [WebdriverJS].

[gulp]: http://gulpjs.com/
[grunt]: http://gruntjs.com/
[1st guideline]: https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md#guidelines
[broccoli]: https://github.com/broccolijs/broccoli
[jspm]: http://jspm.io/
[systemjs]: https://github.com/systemjs/systemjs
[whatwg-fetch]: https://www.npmjs.com/package/whatwg-fetch
[browserify]: http://browserify.org/
[bower]: http://bower.io/
[wiredep]: https://github.com/taptapship/wiredep
[jspm-video]: https://youtu.be/NpMnRifyGyw
[webpack]: http://webpack.github.io/
[bootstrap]: http://getbootstrap.com/
[generator-gulp-webapp]: https://github.com/yeoman/generator-gulp-webapp
[react]: https://facebook.github.io/react/
[react.createclass]: https://facebook.github.io/react/docs/top-level-api.html#react.createclass
[sass]: http://sass-lang.com/
[libsass]: http://libsass.org/
[postcss]: https://github.com/postcss/postcss
[autoprefixer]: https://github.com/postcss/autoprefixer
[gulp-postcss]: https://github.com/postcss/gulp-postcss
[gulp-autoprefixer]: https://github.com/sindresorhus/gulp-autoprefixer
[postcss plugins]: https://github.com/postcss/postcss#plugins
[svg]: https://css-tricks.com/using-svg/
[svg-vs-font]: https://css-tricks.com/icon-fonts-vs-svg/
[svg-symbol]: https://css-tricks.com/svg-symbol-good-choice-icons/
[jsdom]: https://github.com/tmpvar/jsdom
[webdriverio]: http://webdriver.io/
[webdriverjs]: https://code.google.com/p/selenium/wiki/WebDriverJs
