import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// import app from './reducers'
import * as reducers                    from './reducers';
import { syncHistory, routeReducer } from 'react-router-redux'
import { fromJS }                       from 'immutable';

// import appRoutes from './routes';
import { DefaultRoute, Route, Router, browserHistory } from 'react-router';
import App from './components/app/app.cmp';
import PlaceList from './components/places/placeList/placeList.cmp';
import PlaceView from './components/places/placeView/placeView.cmp';
import PlaceAddOrEdit from './components/places/placeAddOrEdit/placeAddOrEdit.cmp';

let initialState = {};

Object
  .keys(initialState)
  .forEach(key => {
    initialState[key] = fromJS(initialState[key]);
   });

const reducer = combineReducers(Object.assign({}, reducers, {
 routing: routeReducer
}));

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);


// const store   = createStore(reducer, initialState);
// let store = createStore(app)
const store = createStoreWithMiddleware(reducer);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="places" component={PlaceList}/>
        <Route name="placeAdd" path="places/add" component={PlaceAddOrEdit}/>
        <Route name="placeView" path="places/:id" component={PlaceView}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
