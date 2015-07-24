import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();

<% if (!includeReact) { -%>
chaiAsPromised.transferPromiseness = browser.transferPromiseness;
<% } -%>
