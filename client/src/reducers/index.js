// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
// import { routeReducer } from 'react-router-redux'
import routeReducer from './routeReducer';
import placeReducer from './placeReducer';
import mapReducer from './mapReducer';

let reducers = Object.assign({}, {
  places: placeReducer,
  map: mapReducer,
  routing: routeReducer
});

//reducers = Immutable.fromJS(reducers);

const appReducer = combineReducers(reducers);
// const appReducer = combineReducers({
//   places: placeReducer,
//   map: mapReducer,
//   routing: routeReducer,
//   // location: function (state) {
//   //   return state;
//   // }
// });

export default appReducer;
