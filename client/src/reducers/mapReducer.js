import Immutable from 'immutable';
import update from 'react-addons-update';
import remove from 'lodash/remove';
import find from 'lodash/find';
import indexOf from 'lodash/indexOf';
import forEach from 'lodash/forEach';
import notifierService from '../services/notifier.srv';
import getMergedState from './reducerHelpers';
import { ANIMATION_DROP, ANIMATION_SHOWITSELF } from '../components/googleMap/constants'

let defaultState = Immutable.fromJS({
    zoom: 7,
    center: {
      lat: 55.44251502256722,
      lng: 23.74947999804681
    },
    isDraggable: true,
    areMarkersDraggable: false,
    markers: Immutable.List(),
	activeMarker: null,
	markerInEditMode: null,
	latLngOnDragEnd: {
		lat: null,
		lng: null
	},
	latLngOnMapClick: null
});

function getMarkerFromPlace(place) {
    return {
        id: place._id,
        title: place.title,
        lat: place.latitude,
        lng: place.longitude
    };
}

export default function mapReducer(state = defaultState, action) {

	let newState;
	let mergedState;
	let markers;
	let marker;
	let activeMarker;
	let markerInEditMode;
	let markerId;
	let index;
    let newLatLng;

    switch(action.type) {

    case 'RESPONSE_GET_PLACES':
    	markers = Immutable.List();

		forEach(action.places, place => {
			marker = getMarkerFromPlace(place);
			markers = markers.push(Immutable.Map(marker));
		});

      return state.set('markers', markers);

	case 'CREATE_TEMP_PLACE':

		marker = Immutable.Map({
			id: 0,
			title: '',
			lat: action.latLng.lat,
			lng: action.latLng.lng,
			animation: ANIMATION_DROP
		});

		return state.update('markers', markers => markers.push(marker));

	case 'DELETE_TEMP_PLACE':

		index = state.get('markers').findIndex(marker => {
			return marker.get('id') === 0;
		});

		markers = state.get('markers');
		markers = markers.remove(index);

		return state.set('markers', markers);

    case 'RESPONSE_CREATE_PLACE':

        marker = getMarkerFromPlace(action.createdPlace);
		marker = Immutable.Map(marker);

		return state.updateIn(['markers'], markers => markers.push(marker));

    case 'RESPONSE_DELETE_PLACE':

		let removeMarkerId = action.placeId;

		index = state.get('markers').findIndex(marker => {
			return marker.get('id') === removeMarkerId;
		});

		markers = state.get('markers');
		markers = markers.remove(index);

		return state.set('markers', markers);

////////////////////
////////////////////
////////////////////

    case 'OPEN_PLACE_CREATE_FORM':
		return updateMarkerProperty(state, 0, 'draggable', true);

    case 'CLOSE_PLACE_CREATE_FORM':

		return updateMarkerProperty(state, 0, 'draggable', false);

    case 'OPEN_PLACE_UPDATE_FORM':

		newState = updateMarkerProperty(state, action.placeId, 'draggable', true);
		newState = updateMarkerProperty(newState, action.placeId, 'animation', ANIMATION_SHOWITSELF);
		newState = updateMarkerProperty(newState, action.placeId, 'isInEditMode', true);

		markerInEditMode = newState.get('markers').find((marker) => {
			return marker.get('id') === action.placeId;
		})

		newState = newState.set('markerInEditMode', markerInEditMode);

		return newState;

    case 'CLOSE_PLACE_UPDATE_FORM':

		newState = updateMarkerProperty(state, action.placeId, 'draggable', false);
		newState = updateMarkerProperty(newState, action.placeId, 'animation', null);
		newState = updateMarkerProperty(newState, action.placeId, 'isInEditMode', false);
		newState = newState.set('markerInEditMode', null);

		return newState;

    case 'CLICK_MAP':

		return state.set('latLngOnMapClick', Immutable.Map(action.latLng));

    case 'MARKER_DRAG_END':
        newLatLng = Immutable.Map({
            lat: action.lat,
            lng: action.lng
        });

        return state.set('latLngOnDragEnd', newLatLng);


    case 'CHANGED_PLACE_COORDS':

        newState = updateMarkerProperty(state, action.placeId, 'lat', action.latLng.lat);
        newState = updateMarkerProperty(newState, action.placeId, 'lng', action.latLng.lng);

        // console.log(action.placeId);
        // console.log(action.latLng);
        // console.log(newState.toJS());

        return newState;

    default:

      return state;
  }

}

function updateMarkerProperty(state, markerId, key, value) {
	let markers = state.get('markers');

	let index = markers.findIndex(marker => {
		return marker.get('id') === markerId;
	});

	markers = markers.update(index, marker => {
		return marker.set(key, value);
	});

	return state.set('markers', markers);
}
