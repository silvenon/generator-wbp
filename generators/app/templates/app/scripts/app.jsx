import React from 'react';
import Router from 'react-router';

import Icon from './components/icon';

import 'es6-promise';
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
  render() {
    return (
      <div className="container">
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
