import Immutable from 'immutable';

// let defaultState = Immutable.fromJS({
//   places: Immutable.fromJS({
//     isFetchingItems: false,
//     areItemsFetched: false,
//     items: Immutable.List([]),
//     activeItemId: null,
//     activeItem: null,
//     isFetchingItem: true,
//     itemInEditMode: null
//   })
// });

let defaultState = {
  places: {
    isFetchingItems: false,
    areItemsFetched: false,
    items: [],
    activeItemId: null,
    activeItem: null,
    isFetchingItem: true,
    itemInEditMode: null
  }
};

function getMergedState(newState, currentState) {
  return Object.assign({}, currentState, newState);
}

export default function placeReducer(state = defaultState, action) {

  switch(action.type) {

    case 'REQUEST_PLACES':
      console.log('request_places (reducer)');
// debugger;

      var newState = {
        isFetchingItems: true
      };

      // return Object.assign({}, state, newState);
      return getMergedState(newState, state);

    case 'RECEIVED_PLACES':
      console.log('received_places (reducer)');
      var newState = {
        items: action.places,
        isFetchingItems: false,
        areItemsFetched: true
      };

      return getMergedState(newState, state);

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
