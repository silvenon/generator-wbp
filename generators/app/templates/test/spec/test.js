describe('suite', () => {
  before(() => {
    return browser.url('/');
  });

  it('should have the correct page title', () => {
    return browser.getTitle().should.eventually.equal('Fixture');
  });
});
