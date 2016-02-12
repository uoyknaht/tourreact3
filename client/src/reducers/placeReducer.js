import Immutable from 'immutable';
import remove from 'lodash/remove';
import find from 'lodash/find';
import indexOf from 'lodash/indexOf';
import getMergedState from './reducerHelpers';
import notifierService from '../services/notifier.srv';

// let defaultState = Immutable.fromJS({
//   places: {
//     isFetchingItems: false,
//     areItemsFetched: false,
//     items: [],
//     activeItemId: null,
//     activeItem: null,
//     isFetchingItem: true,
//     itemInEditMode: null,
//     isCreatingOrUpdatingItem: false,
//     lastCreatedItemId: null,
//     lastUpdatedItemId: null,
//     isDeletingItem: true,
//     isItemDeleted: false
//   }
// });

let defaultState = Immutable.Map({
  places: Immutable.Map({
    isFetchingItems: false,
    areItemsFetched: false,
    items: Immutable.List(),
    activeItemId: null,
    activeItem: null,
    isFetchingItem: true,
    itemInEditMode: null,
    isCreatingOrUpdatingItem: false,
    lastCreatedItemId: null,
    lastUpdatedItemId: null,
    isDeletingItem: true,
    isItemDeleted: false
  })
});

export default function placeReducer(state = defaultState, action) {

  let newState;
  let mergedState;
  let places;

  switch(action.type) {

    case 'REQUEST_GET_PLACES':

        return state.set('isFetchingItems', true);

    case 'RESPONSE_GET_PLACES':

      newState = state.set('isFetchingItems', false);
      newState = newState.set('areItemsFetched', true);
      newState = newState.set('items', Immutable.fromJS(action.places));

      return newState;

      // newState = {
      //   items: action.places,
      //   isFetchingItems: false,
      //   areItemsFetched: true
      // };

      // return state.mergeDeep(newState);

    case 'RESPONSE_GET_PLACES_ERROR':

        notifierService.error('error RESPONSE_GET_PLACES_ERROR');

        return state.set('isFetchingItems', false);

    case 'REQUEST_GET_PLACE':

        return state.set('isFetchingItem', true);

    case 'RESPONSE_GET_PLACE':

        newState = state.set('isFetchingItem', false);

        if (action.isForEdit) {
            newState.set('itemInEditMode', Immutable.Map(action.place));
        } else {
            newState.set('activeItem', Immutable.Map(action.place));
        }

        return newState;

    case 'RESPONSE_GET_PLACE_ERROR':

        notifierService.error('error RESPONSE_GET_PLACE_ERROR');

        return state.set('isFetchingItem', false);

    case 'CLEAN_ACTIVE_PLACE':

        newState = {};

        if (action.isForEdit) {
            newState = state.set('itemInEditMode', null);
            newState = newState.set('lastCreatedItemId', null);
            newState = newState.set('lastUpdatedItemId', null);
        } else {
            newState = state.set('activeItemId', null);
            newState = newState.set('activeItem', null);
            newState = newState.set('isItemDeleted', null);
        }

        return newState;

      ////////////////////
      ////////////////////
      ////////////////////

    case 'REQUEST_CREATE_PLACE':

        return state.set('isCreatingOrUpdatingItem', true);


    case 'RESPONSE_CREATE_PLACE':

        newState = state.set('isCreatingOrUpdatingItem', false);
        newState.set('lastCreatedItemId', action.createdPlace._id);
        newState.update('items', places => places.push(Immutable.Map(action.createdPlace)));
        
        return newState;

        // var places = mergedState.get('items').toJS();
        // places.push(action.createdPlace);
        // mergedState.setIn(['items'], Immutable.List(places));
        // mergedState.setIn(['items'], arr => arr.push(action.createdPlace));

    case 'RESPONSE_CREATE_PLACE_ERROR':

        notifierService.error('error RESPONSE_CREATE_PLACE_ERROR');

        return state.set('isCreatingOrUpdatingItem', false);

      ////////////////////
      ////////////////////
      ////////////////////

    case 'REQUEST_UPDATE_PLACE':

        return state.set('isCreatingOrUpdatingItem', true);

    case 'RESPONSE_UPDATE_PLACE':

        let placeId = action.updatedPlace._id;

        newState = state.set('isCreatingOrUpdatingItem', false);
        newState = newState.set('lastCreatedItemId', placeId);

        places = newState.get('items');
        let index = places.findIndex(place => place.get('_id') === placeId);

        places = places.update(index, place => Immutable.Map(action.updatedPlace)); 
        
        return newState.set('items', places);

        // newState.update('items', (places) => {
        //     places.map((place) => {
        //         if (place._id === placeId) {

        //         }
        //         place.set('isCompleted', true)));  
        //     }
        // }

          // var index = indexOf(mergedState.items, find(mergedState.items, { _id: action.updatedPlace._id }));
          // mergedState.items.splice(index, 1, action.updatedPlace);

          // return mergedState;

    case 'RESPONSE_UPDATE_PLACE_ERROR':

        notifierService.error('error RESPONSE_UPDATE_PLACE_ERROR');

        return state.set('isCreatingOrUpdatingItem', false);


////////////////////
////////////////////
////////////////////

// TODO:

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

        remove(mergedState.items, function (item) {
          return item._id === removePlaceId;
        });


      return mergedState;

    case 'RESPONSE_DELETE_PLACE_ERROR':

        notifierService.error('error RESPONSE_DELETE_PLACE_ERROR');

        return state.set('isDeletingItem', false);

    default:
      return state;
  }

}
