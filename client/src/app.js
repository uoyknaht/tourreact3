// import * as reducers                    from './reducers';
//  const { places } = this.props;

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
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
import './css/app.scss';

let initialState = {
  places: {
    isFetchingItems: false,
    areItemsFetched: false,
    items:[
      {
        _id: 1,
        title: 'Raudondvario pilis'
      },
      {
        _id: 2,
        title: 'Netoniu kalnas'
      },
      {
        _id: 3,
        title: 'Lampedziu kempingas'
      },
    ],
    activeItemId: null,
    activeItem: null,
    isFetchingItem: true,
    itemInEditMode: null
  }
};

initialState = Immutable.fromJS(initialState);

// Object
//   .keys(initialState)
//   .forEach(key => {
//     initialState[key] = fromJS(initialState[key]);
//    });

const reduxRouterMiddleware = syncHistory(browserHistory);

const store = createStore(appReducer, applyMiddleware(reduxRouterMiddleware, thunkMiddleware));

// use initial state when it's clear how to bootstrap it with immutable
// const store = createStore(appReducer, initialState, applyMiddleware(reduxRouterMiddleware, thunkMiddleware));

// const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     thunkMiddleware, // lets us dispatch() functions
//     loggerMiddleware // neat middleware that logs actions
//   )
// )


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
