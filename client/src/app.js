import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/nav/nav.cmp';
import Home from './components/home/home.cmp';
import PlaceList from './components/places/placeList/placeList.cmp';
import PlaceView from './components/places/placeView/placeView.cmp';
import Router from 'react-router';
// import routes from './routes';
import { DefaultRoute, Link, Route, RouteHandler, hashHistory  } from 'react-router';

(function () {

    'use strict';

    const App = React.createClass({
      render() {
        return (
          <div>
            <Nav />
            {this.props.children}
          </div>
        )
      }
    })

    ReactDOM.render((
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="places" component={PlaceList}/>
          <Route path="places/:id" component={PlaceView}/>
        </Route>
      </Router>
    ), document.getElementById('app'))

})();
