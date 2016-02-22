// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
// import { routeReducer } from 'react-router-redux'
import routeReducer from './routeReducer';
import placeReducer from './placeReducer';
import mapReducer from './mapReducer';
import categoriesReducer from './categories.rdc';
import filtersReducer from './filters.rdc';

let reducers = Object.assign({}, {
  places: placeReducer,
  map: mapReducer,
  routing: routeReducer,
  categories: categoriesReducer,
  filters: filtersReducer
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
