import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import placeReducer from './placeReducer';

const appReducer = combineReducers(
  Object.assign({}, {
      places: placeReducer,
      routing: routeReducer
    })
);



// export { default as places } from './placeReducer';
// const appReducer = combineReducers({
//   placeReducer
// });



//
// import * as reducers from './'

// const appReducer = combineReducers(reducers)

export default appReducer;
