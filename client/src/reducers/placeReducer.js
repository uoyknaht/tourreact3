import Immutable from 'immutable';
import remove from 'lodash/remove';
import find from 'lodash/find';
import indexOf from 'lodash/indexOf';
import notifierService from '../services/notifier.srv';

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
    itemInEditMode: null,
    isCreatingOrUpdatingItem: false,
    lastCreatedItemId: null,
    lastUpdatedItemId: null,
    isDeletingItem: true,
    isItemDeleted: false
  }
};

function getMergedState(newState, currentState) {
  return Object.assign({}, currentState, newState);
}

export default function placeReducer(state = defaultState, action) {

  let newState;
  let mergedState;

  switch(action.type) {

    case 'REQUEST_PLACES':
      newState = {
        isFetchingItems: true
      };

      return getMergedState(newState, state);

    case 'RECEIVED_PLACES':
      newState = {
        items: action.places,
        isFetchingItems: false,
        areItemsFetched: true
      };

      return getMergedState(newState, state);

      case 'REQUEST_PLACE':

        newState = {
          isFetchingItem: true
        };

        return getMergedState(newState, state);

      case 'RECEIVED_PLACE':

        newState = {
          isFetchingItem: false
        };

        if (action.isForEdit) {
          newState.itemInEditMode = action.place;
        } else {
          newState.activeItem = action.place;
        }

        return Object.assign({}, state, newState);

      case 'CLEAN_ACTIVE_PLACE':

        newState = {};

        if (action.isForEdit) {
          newState.itemInEditMode = null;
          newState.lastCreatedItemId = null;
          newState.lastUpdatedItemId = null;
        } else {
          newState.activeItemId = null;
          newState.activeItem = null;
          newState.isItemDeleted = false;
        }

        return Object.assign({}, state, newState);

      ////////////////////
      ////////////////////
      ////////////////////

    case 'REQUEST_CREATE_PLACE':

        newState = {
          isCreatingOrUpdatingItem: true
        };

        return getMergedState(newState, state);

    case 'RESPONSE_CREATE_PLACE':

          newState = {
            isCreatingOrUpdatingItem: false
          };

          mergedState = getMergedState(newState, state);

          if (!action.isSuccess) {
            notifierService.error('error creating place');
            return mergedState;
          }

          mergedState.lastCreatedItemId = action.createdPlace._id;
          mergedState.items.push(action.createdPlace);

          return mergedState;

      ////////////////////
      ////////////////////
      ////////////////////

    case 'REQUEST_UPDATE_PLACE':

        newState = {
          isCreatingOrUpdatingItem: true
        };

        return getMergedState(newState, state);


    case 'RESPONSE_UPDATE_PLACE':
    // debugger;

          newState = {
            isCreatingOrUpdatingItem: false,
            lastCreatedItemId: action.updatedPlace._id
          };

          mergedState = getMergedState(newState, state);

          var index = indexOf(mergedState.items, find(mergedState.items, { _id: action.updatedPlace._id }));
          mergedState.items.splice(index, 1, action.updatedPlace);

          return mergedState;

    case 'RESPONSE_UPDATE_PLACE_ERROR':

        newState = {
          isCreatingOrUpdatingItem: false
        };

        notifierService.error('error updating place');

        return getMergedState(newState, state);


////////////////////
////////////////////
////////////////////




    case 'REQUEST_DELETE_PLACE':

      newState = {
        isDeletingItem: true
      };

      return getMergedState(newState, state);

    case 'RESPONSE_DELETE_PLACE':

      var removePlaceId = action.placeId;

      newState = {
        isDeletingItem: false,
        isItemDeleted: true
      };

      mergedState = getMergedState(newState, state);

      if (action.isSuccess) {
        remove(mergedState.items, function (item) {
          return item._id === removePlaceId;
        });
      } else {
        notifierService.error('error removing place');
      }

      return mergedState;

    default:
      return state;
  }

}
