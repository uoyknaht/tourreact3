import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import Immutable from 'immutable';
import placeReducer from './placeReducer';

let reducers = Object.assign({}, {
  places: placeReducer,
  routing: routeReducer
});

//reducers = Immutable.fromJS(reducers);

const appReducer = combineReducers(reducers);

export default appReducer;
