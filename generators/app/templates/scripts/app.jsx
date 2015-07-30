import React from 'react/addons';
import Router from 'react-router';
import fetch from './helpers/fetch.js';
import Icon from './components/icon';
import Loader from './components/loader';

import 'svg4everybody';
import './fonts.js';

const {
  Route,
  RouteHandler
} = Router;

const App = React.createClass({
  propTypes: {},

  getInitialState() {
    return {
      loading: true
    };
  },

  componentDidMount() {
    fetch('/index.html').then(res => {
      // a little artificial delay never hurt anyone
      setTimeout(() => {
        console.log(res);
        this.setState({
          loading: false
        });
      }, 3000);
    });
  },

  render() {
    let content;

    if (this.state.loading) {
      content = (
        <div className="container">
          <Loader />
        </div>
      );
    } else {
      content = (
        <div className="container">
          <h1>You look <strong>great</strong> today!</h1>
          <Icon symbol="heart" role="presentation" />
          <RouteHandler />
        </div>
      );
    }

    return content;
  }
});

const routes = (
  <Route path="/" handler={App}>
    {/* routes */}
  </Route>
);

Router.run(routes, Handler => {
  React.render(<Handler />, document.getElementById('content'));
});

console.log('Hello World from React!');
