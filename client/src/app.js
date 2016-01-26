import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/nav/nav.cmp';
import Home from './components/home/home.cmp';
import PlaceList from './components/places/placeList/placeList.cmp';
import Router from 'react-router';
// import routes from './routes';
import { DefaultRoute, Link, Route, RouteHandler, hashHistory  } from 'react-router';

(function () {

    'use strict';

    // Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    // Router.run(routes, function (Handler, state) {
    //     var params = state.params;
    //     React.render(<Handler params={params}/>, document.body);
    // });

    const App = React.createClass({
      render() {
        return (
          <div>
            <Nav />
            <h1>App</h1>
            {this.props.children}
          </div>
        )
      }
    })

    ReactDOM.render((
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="places" component={PlaceList} />
        </Route>
      </Router>
    ), document.getElementById('app'))

})();
