import React from 'react/addons';

export default React.createClass({
  propTypes: {
    height: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    role: React.PropTypes.string.isRequired,
    symbol: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  render() {
    const {symbol, ...other} = this.props;
    const use = `<use xlink:href="/images/icons.svg#${symbol}" />`;

    // https://github.com/eslint/eslint/issues/3271
    /* eslint-disable no-undef */
    return (
      <svg
        {...other}
        className={'icon icon-' + symbol}
        dangerouslySetInnerHTML={{__html: use}}
      />
    );
    /* eslint-enable no-undef */
  }
});
