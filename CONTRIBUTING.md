# Contributing

Go crazy with suggestions and requests, I'm listening.

I created this generator for myself and my purposes, which means that I'll be maintaining it regularly (until something better comes along). This also means that I will reject requests that are not really my style (sorry), but you can be sure that I'll consider them carefully.

I want to make this generator a collection of best practices and I will do my best to document why I made certain choices.

## [gulp]

In comparison to [Grunt], gulp:

  * is faster
  * requires less code
  * is easier to read
  * doesn't always require plugins ([1st guideline])

There are other interesting tools rising, like [Broccoli], but I'm not sure if any of them are mature enough, so for now I'm sticking to gulp.

## [jspm]

Even though it's pretty new, I think jspm does it right:

  * does a lot with very little setup
  * uses [SystemJS], a standards-compliant and future-friendly module loader
  * can pull from any registry (npm, GitHub…)
  * supports all module formats (ES6, CommonJS, AMD, UMD…)
  * supports mapping (e.g. [whatwg-fetch] can be imported as `fetch`)
  * supports overriding module's `package.json`
  * doesn't require recompilation during development
  * can optimize code for production in advanced ways
  * many more awesome features that I don't even know about

Also, it's undergoing rapid development, thanks to [@guybedford] and others, so it will keep getting more awesome. [This][jspm-video] video is great for getting started with jspm.

I used to use [Browserify], but it was kinda hard to set up and awkward to use (I mean [look at this][browserify-setup]). Before that I was using [Bower] with [wiredep], which was pretty basic, messy to set up and offered no way of importing modules.

## [Bootstrap]

I think Bootstrap is great, it's very well-coded, works great accross browsers, has a strong community and, unlike many other frameworks, encourages accessibility and has it built-in!

The reason why I chose **not** to include it is because everyone has their own UI preferences and it's very likely Bootstrap will not handle something the way you want, which is limiting and annoying. I think Bootstrap is an excellent learning resource, but not really a good idea to use it directly in projects where you need advanced UI control.

## [React]

I chose React among other frameworks because it's:

  * simple to understand and use
  * unobtrusive, i.e. can be combined with other frameworks (if you're into that)
  * easy to start with, Babel has built-in JSX support

It worked great for me so far and is the only one for which I can say that I kinda-sorta mastered.

I made it optional because there is a good chance you'll want something else, and removing it manually each time isn't trivial.

### ES2015 Classes

Currently using ES2015 classes with React doesn't really offer any advantages, only limitations -- we are unable to use mixins, we have to bind `this` to every custom method etc. That's why I'm using React's `#createClass` method instead.

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

I'm open for convincing to move to [wd]. It seems to have a very similar goal, but with a different API. I haven't tried it for real yet.

[gulp]: http://gulpjs.com/
[grunt]: http://gruntjs.com/
[1st guideline]: https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md#guidelines
[broccoli]: https://github.com/broccolijs/broccoli
[jspm]: http://jspm.io/
[systemjs]: https://github.com/systemjs/systemjs
[whatwg-fetch]: https://www.npmjs.com/package/whatwg-fetch
[@guybedford]: https://github.com/guybedford
[jspm-video]: https://youtu.be/NpMnRifyGyw
[browserify]: http://browserify.org/
[browserify-shim]: https://github.com/thlorenz/browserify-shim
[browserify-setup]: https://github.com/gulpjs/gulp/blob/796989a802afda92ae3e86b65db6bb92d8371d66/docs/recipes/fast-browserify-builds-with-watchify.md
[bower]: http://bower.io/
[wiredep]: https://github.com/taptapship/wiredep
[webpack]: http://webpack.github.io/
[bootstrap]: http://getbootstrap.com/
[generator-gulp-webapp]: https://github.com/yeoman/generator-gulp-webapp
[react]: https://facebook.github.io/react/
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
[webdriverio]: http://webdriver.io/
[webdriverjs]: https://code.google.com/p/selenium/wiki/WebDriverJs
[wd]: https://github.com/admc/wd
