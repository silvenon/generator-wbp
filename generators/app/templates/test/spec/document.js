import jsdom from 'jsdom';

// http://mochajs.org/#root-level-hooks

before(() => {
  global.document = jsdom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
  global.window = global.document.parentWindow;
  global.Element = window.Element;
  global.navigator = window.navigator;
  // shim document.classList
  require('../vendor/classList')(global.window);
});
