import Immutable from 'immutable';
import update from 'react-addons-update';
import remove from 'lodash/remove';
import find from 'lodash/find';
import indexOf from 'lodash/indexOf';
import forEach from 'lodash/forEach';
import notifierService from '../services/notifier.srv';
import getMergedState from './reducerHelpers';

let defaultState = Immutable.fromJS({
    zoom: 7,
    center: {
      lat: 55.44251502256722,
      lng: 23.74947999804681
    },
    isDraggable: true,
    areMarkersDraggable: false,
    markers: Immutable.List()
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
	let index;

    switch(action.type) {

    case 'RESPONSE_GET_PLACES':
    	markers = Immutable.List();

		forEach(action.places, place => {
			marker = getMarkerFromPlace(place);
			markers = markers.push(Immutable.Map(marker));
		});

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

    case 'OPEN_PLACE_CREATE_OR_UPDATE_FORM':

      newState = {
        isDraggable: false,
        areMarkersDraggable: true
      };

      return getMergedState(newState, state);

    case 'CLOSE_PLACE_CREATE_OR_UPDATE_FORM':

      newState = {
        isDraggable: true,
        areMarkersDraggable: false
      };

      return getMergedState(newState, state);

    case 'DRAG_MARKER':

      mergedState = getMergedState({}, state);
      marker = find(mergedState.markers, { id: action.markerId });
      marker.lat = action.newLat;
      marker.lng = action.newLng;

      // console.log(action.newLat);
      return mergedState;

    default:
      return state;
  }

}
