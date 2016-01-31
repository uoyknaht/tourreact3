import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler, hashHistory  } from 'react-router';
import App from './components/app/app.cmp';
// import Home from './components/home/home.cmp';
import PlaceList from './components/places/placeList/placeList.cmp';
import PlaceView from './components/places/placeView/placeView.cmp';
import PlaceAddOrEdit from './components/places/placeAddOrEdit/placeAddOrEdit.cmp';

var appRoutes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="places" component={PlaceList}/>
      <Route name="placeAdd" path="places/add" component={PlaceAddOrEdit}/>
      <Route name="placeView" path="places/:id" component={PlaceView}/>

    </Route>
  </Router>
);

export default appRoutes;
