import React from 'react';

export default React.createClass({
  propTypes: {
    symbol: React.PropTypes.string.isRequired,
    role: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },

  render() {
    const {symbol, ...other} = this.props;
    const use = `<use xlink:href="/images/icons.svg#${symbol}" />`;

    return (
      <svg
        {...other}
        className={'icon icon-' + symbol}
        dangerouslySetInnerHTML={{__html: use}} />
    );
  }
});
