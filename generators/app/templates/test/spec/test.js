import client from '../client';

describe('suite', () => {
  before(() => {
    return client.url('http://localhost:9000/index.html');
  });

  it('should have the correct page title', () => {
    return client.getTitle().should.eventually.equal('Fixture');
  });
});
