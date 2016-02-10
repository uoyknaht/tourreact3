import Immutable from 'immutable';
import update from 'react-addons-update';
import remove from 'lodash/remove';
import find from 'lodash/find';
import indexOf from 'lodash/indexOf';
import forEach from 'lodash/forEach';
import notifierService from '../services/notifier.srv';
import getMergedState from './reducerHelpers';

let defaultState = {
    zoom: 7,
    center: {
      lat: 55.44251502256722,
      lng: 23.74947999804681
    },
    isDraggable: true,
    areMarkersDraggable: false,
    markers: []
};

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

  switch(action.type) {

    case 'RECEIVED_PLACES':

      newState = {
        markers: []
      };

      forEach(action.places, place => {
        newState.markers.push(getMarkerFromPlace(place))
      });

      return getMergedState(newState, state);

    case 'RESPONSE_CREATE_PLACE':

        mergedState = getMergedState({}, state);
        // mergedState.items = [...mergedState.markers, getMarkerFromPlace(action.createdPlace)];
        mergedState.markers.push(getMarkerFromPlace(action.createdPlace));

        return mergedState;

    case 'RESPONSE_DELETE_PLACE':




        mergedState = getMergedState({}, state);

        remove(mergedState.markers, function (marker) {
            return marker.id === action.placeId;
        });

        return mergedState;








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
      let marker = find(mergedState.markers, { id: action.markerId });
      marker.lat = action.newLat;
      marker.lng = action.newLng;

      // console.log(action.newLat);
      return mergedState;

    default:
      return state;
  }

}
