import '../helpers/common';

describe('suite', () => {
  before(() => {
    return browser.url('http://localhost:9000/index.html');
  });

  it('should have the correct page title', () => {
    return browser.getTitle().should.eventually.equal('Fixture');
  });
});
