// import * as reducers                    from './reducers';
//  const { places } = this.props;
// Object
//   .keys(initialState)
//   .forEach(key => {
//     initialState[key] = fromJS(initialState[key]);
//    });
// const reducer = combineReducers(appReducer);

// use initial state when it's clear how to bootstrap it with immutable
// const store = createStore(appReducer, initialState, applyMiddleware(reduxRouterMiddleware, thunkMiddleware));

// const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     thunkMiddleware, // lets us dispatch() functions
//     loggerMiddleware // neat middleware that logs actions
//   )
// )

// return state.merge(newState);
// return state.mergeDeep(newState);

// return fetch(`http://localhost:8081/api/places`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: newPlace
//     })
//     .then(response => response.json())
//     .then(json => dispatch(responseUpdatePlace(json)))
//     .catch(err => console.log(err));

// <Marker lat={59.955413} lng={30.337844} text={'A'} />
// <Marker lat={59.724465} lng={30.080121} text={'A'} />

// push to array: return [...list, itemToPush];
// https://egghead.io/lessons/javascript-redux-avoiding-array-mutations-with-concat-slice-and-spread

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
// import { combineReducers } from 'redux-immutablejs';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux'
import appReducer                    from './reducers';
import { syncHistory, routeReducer } from 'react-router-redux'
import { fromJS }                       from 'immutable';

// import appRoutes from './routes';
import { DefaultRoute, Route, Router, browserHistory } from 'react-router';
import Immutable from 'immutable';
import App from './components/app/app.cmp';
import PlaceList from './components/places/placeList/placeList.cmp';
import PlaceView from './components/places/placeView/placeView.cmp';
import PlaceAddOrEdit from './components/places/placeAddOrEdit/placeAddOrEdit.cmp';
import './css/bootstrap.css';
import './css/toastr.scss';
import './css/app.scss';

const reduxRouterMiddleware = syncHistory(browserHistory);
const store = createStore(appReducer, applyMiddleware(reduxRouterMiddleware, thunkMiddleware));

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="places" component={PlaceList}/>
        <Route name="placeView" path="places/:id" component={PlaceView}/>
        <Route name="placeCreate" path="places/actions/create" component={PlaceAddOrEdit}/>
        <Route name="placeEdit" path="places/:id/edit" component={PlaceAddOrEdit}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
