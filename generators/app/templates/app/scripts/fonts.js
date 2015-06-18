/* global FontFaceObserver */

import 'es6-promise';
import 'fontfaceobserver';

// reduce FOIT
// http://www.filamentgroup.com/lab/font-events.html

// don't use if you're not loading any web fonts
new FontFaceObserver('sans-serif')
  .check()
  .then(function () {
    // class name inspired by the wf-active class given by Web Font Loader
    // https://github.com/typekit/webfontloader
    document.documentElement.classList.add('wf-actually-active');
  });
