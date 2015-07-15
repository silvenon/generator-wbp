describe('Icon', () => {
  let React, utils, Icon;

  before(() => {
    React = require('react/addons');
    utils = React.addons.TestUtils;
    Icon = require('../../app/scripts/components/icon');
  });

  it('sets the symbol', () => {
    const el = utils.renderIntoDocument(
      <Icon
        symbol="heart"
        role="img"
        title="Heart"
        width="100"
        height="100" />
    );
    const icon = React.findDOMNode(el);
    const use = icon.querySelector('use');

    icon.getAttribute('class').should.contain('icon-heart');
    use.getAttribute('xlink:href').should.contain('#heart');
  });
});
