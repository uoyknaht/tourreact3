import Immutable from 'immutable';

// const defaultState = new Immutable.List();
const defaultState = {};

export default function placeReducer(state = defaultState, action) {

  switch(action.type) {

    case 'REQUEST_PLACES':
      console.log('request_places (reducer)');
      return state;

    case 'RECEIVED_PLACES':
      console.log('received_places (reducer)');
      var newState = {
        items: action.places
      };

      // return state.merge(newState);
      return Object.assign({}, state, newState);

      case 'REQUEST_PLACE':

        var newState = {
          isFetchingItem: true
        };

        return Object.assign({}, state, newState);

      case 'RECEIVED_PLACE':

        var newState = {
          isFetchingItem: false,
          activeItem: action.place
        };

        // return state.merge(newState);
        return Object.assign({}, state, newState);

    // case 'GET_PLACE':
    //   console.log(state);
    //   return state.concat(action.place);
    //
    // case 'ADD_PLACE':
    //   return state.concat(action.place);
    //
    // case 'EDIT_PLACE':
    //   return state.set(action.id, action.place);
    //
    // case 'REMOVE_PLACE':
    //   return state.delete(action.id);

    default:
      return state;
  }

}
