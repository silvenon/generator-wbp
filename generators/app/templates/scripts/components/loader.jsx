import React from 'react';

export default React.createClass({
  propTypes: {
    loading: React.PropTypes.bool.isRequired
  },

  render() {
    let content;

    if (this.props.loading) {
      content = (
        <div className="loader">
          <div className="loader-inner line-scale-pulse-out-rapid">
            {[1, 2, 3, 4, 5].map(function (n) { return <div key={n} />; })}
          </div>
        </div>
      );
    }

    return content;
  }
});
