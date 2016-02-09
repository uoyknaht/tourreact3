import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import Immutable from 'immutable';
import placeReducer from './placeReducer';
import mapReducer from './mapReducer';

let reducers = Object.assign({}, {
  places: placeReducer,
  map: mapReducer,
  routing: routeReducer
});

//reducers = Immutable.fromJS(reducers);

const appReducer = combineReducers(reducers);

export default appReducer;
