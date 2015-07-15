import jsdom from 'jsdom';

// http://mochajs.org/#root-level-hooks

before(() => {
  global.document = jsdom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
  global.window = global.document.parentWindow;
  global.Element = window.Element;
  global.navigator = {userAgent: 'node.js'};
  // shim document.classList
  require('../helpers/classList')(global.window);
});
