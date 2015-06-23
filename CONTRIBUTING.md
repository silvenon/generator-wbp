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

## [Bootstrap]

I think Bootstrap is great, it's very well-coded, works great accross browsers, has a strong community and, unlike many other frameworks, encourages accessibility and has it built-in!

The reason why I chose **not** to include it is because everyone has their own UI preferences and it's very likely Bootstrap will not handle something the way you want, which is limiting and annoying. I think Bootstrap is an excellent learning resource, but not really a good idea to use it directly in projects where you need advanced UI control.

## [Browserify]

I used to use [Bower] + [wiredep] (like we do in [generator-gulp-webapp]), but Browserify offers Node-like `require()`, which improves authoring experience and frees you of worrying about the source order. Also, it consumes npm packages, which we're using for development anyway, so that's one less package manager to worry about.

I'm open for convincing to move to an alternative (see [#2]), like [jspm] or [webpack], I just haven't tried it for real yet, because the learning curve seemed steeper.

## [React]

I chose React among other frameworks because it's:

  * simple to understand and use
  * unobtrusive, i.e. can be combined with other frameworks (if you're into that)
  * easy to start with, Babel has built-in JSX support

It worked great for me so far and is the only one for which I can say that I kinda-sorta mastered.

I made it optional because there is a good chance you'll want something else, and removing it manually each time isn't trivial.

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
[bootstrap]: http://getbootstrap.com/
[browserify]: http://browserify.org/
[bower]: http://bower.io/
[wiredep]: https://github.com/taptapship/wiredep
[generator-gulp-webapp]: https://github.com/yeoman/generator-gulp-webapp
[#2]: https://github.com/silvenon/generator-wbp/issues/2
[jspm]: http://jspm.io/
[webpack]: http://webpack.github.io/
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
