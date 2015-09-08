import React from 'react/addons';

export default React.createClass({
  render() {
    return (
      <div className="loader">
        <div className="loader-inner line-scale-pulse-out-rapid">
          {[1, 2, 3, 4, 5].map((n) => <div key={n} />)}
        </div>
      </div>
    );
  }
});
