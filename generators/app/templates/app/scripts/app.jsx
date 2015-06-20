import React from 'react';
import Router from 'react-router';
import fetch from './helpers/fetch';
import Icon from './components/icon';

import 'svg4everybody';
import './fonts';

const {
  Route,
  DefaultRoute,
  NotFoundRoute,
  Redirect,
  RouteHandler
} = Router;

const App = React.createClass({
  componentDidMount() {
    fetch('/index.html').then((res) => {
      console.log('Fetch API call successful!');
    });
  },

  render() {
    return (
      <div className="container">
        <h1>You look <strong>great</strong> today!</h1>
        <Icon symbol="heart" role="presentation" />
        <RouteHandler />
      </div>
    );
  }
});

const routes = (
  <Route name="app" path="/" handler={App}>

  </Route>
);

Router.run(routes, (Handler) => {
  React.render(<Handler />, document.body);
});

console.log('Hello World from React!');
