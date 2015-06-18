import webdriverio from 'webdriverio';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

let client = global.client;

if (client && client.requestHandler.sessionID) {
  // client exists
} else {
  client = webdriverio.remote({
    logLevel: process.env.TRAVIS ? 'command' : 'silent',
    desiredCapabilities: {
      browserName: 'phantomjs'
    }
  });

  chai.use(chaiAsPromised);
  chai.should();
  chaiAsPromised.transferPromiseness = client.transferPromiseness;

  client.init();

  global.client = client;
}

module.exports = client;
