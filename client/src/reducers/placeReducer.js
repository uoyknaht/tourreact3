import Immutable from 'immutable';
import remove from 'lodash/remove';
import find from 'lodash/find';
import indexOf from 'lodash/indexOf';
import getMergedState from './reducerHelpers';
import notifierService from '../services/notifier.srv';

let defaultState = Immutable.Map({
	isFetchingItems: false,
	areItemsFetched: false,
	places: Immutable.List(),
	activeItemId: null,
	activeItem: null,
	isFetchingItem: true,
	itemInEditMode: null,
	isCreatingOrUpdatingItem: false,
	lastCreatedItemId: null,
	lastUpdatedItemId: null,
	isDeletingItem: false,
	isItemDeleted: false
});

export default function placeReducer(state = defaultState, action) {

	let newState;
	let mergedState;
	let places;
	let place;
	let newPlace;
	let index;

	switch(action.type) {

		case 'REQUEST_GET_PLACES':

			return state.set('isFetchingItems', true);

		case 'RESPONSE_GET_PLACES':

			newState = state.set('isFetchingItems', false);
			newState = newState.set('areItemsFetched', true);
			newState = newState.set('places', Immutable.fromJS(action.places));

			return newState;

			// newState = {
			//   places: action.places,
			//   isFetchingItems: false,
			//   areItemsFetched: true
			// };

			// return state.mergeDeep(newState);

		case 'RESPONSE_GET_PLACES_ERROR':

			notifierService.error('error RESPONSE_GET_PLACES_ERROR');

			return state.set('isFetchingItems', false);

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

		case 'REQUEST_GET_PLACE':

			return state.set('isFetchingItem', true);

		case 'RESPONSE_GET_PLACE':

			newState = state.set('isFetchingItem', false);
			place = Immutable.fromJS(action.place);

			if (action.isForEdit) {
				newState = newState.set('itemInEditMode', place);
			} else {
				newState = newState.set('activeItem', place);
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

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

		case 'CREATE_TEMP_PLACE':

			newPlace = Immutable.Map({
				_id: 0,
				latitude: action.latLng.lat,
				longitude: action.latLng.lng
			});

			return state.update('places', places => places.push(newPlace));

		case 'DELETE_TEMP_PLACE':

			index = state.get('places').findIndex(place => {
				return place.get('_id') === 0;
			});

			places = state.get('places');
			places = places.remove(index);

			return state.set('places', places);

		case 'REQUEST_CREATE_PLACE':

			return state.set('isCreatingOrUpdatingItem', true);

		case 'RESPONSE_CREATE_PLACE':

			newState = state.set('isCreatingOrUpdatingItem', false);
			newState = newState.set('lastCreatedItemId', action.createdPlace._id);
			newState = newState.update('places', places => places.push(Immutable.fromJS(action.createdPlace)));

			return newState;

		case 'RESPONSE_CREATE_PLACE_ERROR':

			notifierService.error('error RESPONSE_CREATE_PLACE_ERROR');

			return state.set('isCreatingOrUpdatingItem', false);

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

		case 'REQUEST_UPDATE_PLACE':

			return state.set('isCreatingOrUpdatingItem', true);

		case 'RESPONSE_UPDATE_PLACE':

			let placeId = action.updatedPlace._id;

			newState = state.set('isCreatingOrUpdatingItem', false);
			newState = newState.set('lastCreatedItemId', placeId);

			places = newState.get('places');
			index = places.findIndex(place => place.get('_id') === placeId);

			places = places.update(index, place => Immutable.Map(action.updatedPlace));

			return newState.set('places', places);

			// newState.update('places', (places) => {
			//     places.map((place) => {
			//         if (place._id === placeId) {

			//         }
			//         place.set('isCompleted', true)));
			//     }
			// }

			// var index = indexOf(mergedState.places, find(mergedState.places, { _id: action.updatedPlace._id }));
			// mergedState.places.splice(index, 1, action.updatedPlace);

			// return mergedState;

		case 'RESPONSE_UPDATE_PLACE_ERROR':

			notifierService.error('error RESPONSE_UPDATE_PLACE_ERROR');

			return state.set('isCreatingOrUpdatingItem', false);


/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

		case 'REQUEST_DELETE_PLACE':

			return state.set('isDeletingItem', true);

		case 'RESPONSE_DELETE_PLACE':

			var removePlaceId = action.placeId;

			newState = state.set('isDeletingItem', false);
			newState = newState.set('isItemDeleted', true);

			index = newState.get('places').findIndex(place => {
				return place.get('_id') === removePlaceId;
			});

			places = newState.get('places');
			places = places.remove(index);

			newState = newState.set('places', places);

			return newState;

		case 'RESPONSE_DELETE_PLACE_ERROR':

			notifierService.error('error RESPONSE_DELETE_PLACE_ERROR');

			return state.set('isDeletingItem', false);

		default:
			return state;
	}

}
