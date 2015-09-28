import jsdom from 'jsdom';

// http://mochajs.org/#root-level-hooks

before((done) => {
  jsdom.env('<!DOCTYPE html><html><head></head><body></body></html>', (err, window) => {
    if (err) { return done(err); }
    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;
    global.Element = window.Element;
    done();
  });
});
