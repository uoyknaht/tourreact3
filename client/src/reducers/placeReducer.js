import Immutable from 'immutable';
import remove from 'lodash/remove';
import find from 'lodash/find';
import indexOf from 'lodash/indexOf';
import getMergedState from './reducerHelpers';
import notifierService from '../services/notifier.srv';

let defaultState = Immutable.Map({
	isFetchingPlaces: false,
	arePlacesFetched: false,
	places: Immutable.List(),
	visiblePlaces: Immutable.List(),
	activeItemId: null,
	activeItem: null,
	isFetchingPlace: false,
	itemInEditMode: null,
	isCreatingOrUpdatingItem: false,
	lastCreatedItemId: null,
	lastUpdatedItemId: null,
	isDeletingItem: false,
	isItemDeleted: false,
	placeIdInQueue: null
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
			return state.set('isFetchingPlaces', true);

		case 'RESPONSE_FETCH_PLACES':
			state = state.set('arePlacesFetched', true);
			state = state.set('places', Immutable.fromJS(action.places));
			return state;

		case 'RESPONSE_GET_PLACES':
			state = state.set('isFetchingPlaces', false);
			state = state.set('visiblePlaces', Immutable.fromJS(action.places));
			return state;

		case 'RESPONSE_GET_PLACES_ERROR':
			notifierService.error('error RESPONSE_GET_PLACES_ERROR');
			return state.set('isFetchingPlaces', false);

		case 'ADD_PLACE_TO_QUEUE':
			return state.set('placeIdInQueue', action.placeId);

		case 'REMOVE_PLACE_FROM_QUEUE':
			return state.set('placeIdInQueue', null);

/////////////////////////////////////////////

		case 'REQUEST_GET_PLACE':
			return state.set('isFetchingPlace', true);

		case 'RESPONSE_GET_PLACE':
			state = state.set('isFetchingPlace', false);
			place = Immutable.fromJS(action.place);
			if (action.isForEdit) {
				state = state.set('itemInEditMode', place);
			} else {
				state = state.set('activeItem', place);
			}
			return state;

		case 'RESPONSE_GET_PLACE_ERROR':
			notifierService.error('error RESPONSE_GET_PLACE_ERROR');
			return state.set('isFetchingPlace', false);

		case 'CLEAN_ACTIVE_PLACE':
			if (action.isForEdit) {
				state = state.set('itemInEditMode', null);
				state = state.set('lastCreatedItemId', null);
				state = state.set('lastUpdatedItemId', null);
			} else {
				state = state.set('activeItemId', null);
				state = state.set('activeItem', null);
				state = state.set('isItemDeleted', null);
			}
			return state;

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
			state = state.set('isCreatingOrUpdatingItem', false);
			state = state.set('lastCreatedItemId', action.createdPlace._id);
			state = state.update('places', places => places.push(Immutable.fromJS(action.createdPlace)));
			return state;

		case 'RESPONSE_CREATE_PLACE_ERROR':
			notifierService.error('error RESPONSE_CREATE_PLACE_ERROR');
			return state.set('isCreatingOrUpdatingItem', false);

/////////////////////////////////////////////

		case 'REQUEST_UPDATE_PLACE':
			return state.set('isCreatingOrUpdatingItem', true);

		case 'RESPONSE_UPDATE_PLACE':
			let placeId = action.updatedPlace._id;
			state = state.set('isCreatingOrUpdatingItem', false);
			state = state.set('lastCreatedItemId', placeId);
			places = state.get('places');
			index = places.findIndex(place => place.get('_id') === placeId);
			places = places.update(index, place => Immutable.Map(action.updatedPlace));
			return state.set('places', places);

		case 'RESPONSE_UPDATE_PLACE_ERROR':
			notifierService.error('error RESPONSE_UPDATE_PLACE_ERROR');
			return state.set('isCreatingOrUpdatingItem', false);

/////////////////////////////////////////////

		case 'REQUEST_DELETE_PLACE':
			return state.set('isDeletingItem', true);

		case 'RESPONSE_DELETE_PLACE':
			var removePlaceId = action.placeId;
			state = state.set('isDeletingItem', false);
			state = state.set('isItemDeleted', true);
			index = state.get('places').findIndex(place => {
				return place.get('_id') === removePlaceId;
			});
			places = state.get('places');
			places = places.remove(index);
			state = state.set('places', places);
			return state;

		case 'RESPONSE_DELETE_PLACE_ERROR':
			notifierService.error('error RESPONSE_DELETE_PLACE_ERROR');
			return state.set('isDeletingItem', false);

		default:
			return state;
	}

}
