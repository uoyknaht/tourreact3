import Immutable from 'immutable';

// const defaultState = new Immutable.List();
const defaultState = {};

function getMergedState(newState, currentState) {
  return Object.assign({}, currentState, newState);
}

export default function placeReducer(state = defaultState, action) {

  switch(action.type) {

    case 'REQUEST_PLACES':
      console.log('request_places (reducer)');

      var newState = {
        isFetchingItems: true
      };

      return getMergedState(newState, state);

    case 'RECEIVED_PLACES':
      console.log('received_places (reducer)');
      var newState = {
        items: action.places,
        isFetchingItems: false,
        areItemsFetched: true
      };

      // return state.merge(newState);
      return Object.assign({}, state, newState);

      case 'REQUEST_PLACE':

        var newState = {
          isFetchingItem: true
        };

        return getMergedState(newState, state);

      case 'RECEIVED_PLACE':

        var newState = {
          isFetchingItem: false
        };

        if (action.isForEdit) {
          newState.itemInEditMode = action.place;
        } else {
          newState.activeItem = action.place;
        }

        // return state.merge(newState);
        return Object.assign({}, state, newState);

      case 'CLEAN_ACTIVE_PLACE':

        var newState = {};

        if (action.isForEdit) {
          newState.itemInEditMode = null;
        } else {
          newState.activeItemId = null;
          newState.activeItem = null;
        }

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

    case 'REMOVE_PLACE':
// make with immutable
      var places = state.places.items;
      var removePlaceId = action.placeId;





      return state.delete(action.id);

    default:
      return state;
  }

}
