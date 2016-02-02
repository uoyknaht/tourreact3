import Immutable from 'immutable';
// import ApiService from '../services/api.srv';
import { receivedPlaces } from '../actions/placeActions';

const defaultState = new Immutable.List();

export default function placeReducer(state = defaultState, action) {

  switch(action.type) {

    case 'REQUEST_PLACES':
      console.log('request_places (reducer)');
      return state;
    case 'RECEIVED_PLACES':
      console.log('received_places (reducer)');
console.log(action.places);
      var newState = {
        places: action.places
      };

      // return state.merge(newState);

      return Object.assign({}, newState, state);

    case 'GET_PLACE':
      console.log(state);
      return state.concat(action.place);

    case 'ADD_PLACE':
      return state.concat(action.place);

    case 'EDIT_PLACE':
      return state.set(action.id, action.place);

    case 'REMOVE_PLACE':
      return state.delete(action.id);

    default:
      return state;
  }

}
