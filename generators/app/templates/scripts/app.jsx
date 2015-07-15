/* eslint no-console: 0 */

import React from 'react/addons';
import Router from 'react-router';
import fetch from './helpers/fetch.js';
import Icon from './components/icon';
import Loader from './components/loader';

import 'svg4everybody';
import './fonts.js';

const {
  Route,
  DefaultRoute,
  NotFoundRoute,
  Redirect,
  RouteHandler
} = Router;

const App = React.createClass({
  propTypes: {},

  getInitialState() {
    return {
      loading: false
    };
  },

  componentDidMount() {
    this.setState({
      loading: true
    });

    fetch('/index.html').then((res) => {
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
          <Loader loading={this.state.loading} />
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
  <Route name="app" path="/" handler={App}>
    {/* routes */}
  </Route>
);

Router.run(routes, (Handler) => {
  React.render(<Handler />, document.getElementById('content'));
});

console.log('Hello World from React!');
