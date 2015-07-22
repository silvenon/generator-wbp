/* global FontFaceObserver */

import 'es6-promise';
import 'fontfaceobserver';

// reduce FOIT
// http://www.filamentgroup.com/lab/font-events.html

// don't use if you're not loading any web fonts
new FontFaceObserver('Open Sans')
  .check()
  .then(() => {
    // loaded
  });
