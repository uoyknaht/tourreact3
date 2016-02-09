import Immutable from 'immutable';
import remove from 'lodash/remove';
import find from 'lodash/find';
import indexOf from 'lodash/indexOf';
import forEach from 'lodash/forEach';
import notifierService from '../services/notifier.srv';
import getMergedState from './reducerHelpers';

let defaultState = {
  map: {
    zoom: 7,
    center: {
      lat: 55.44251502256722,
      lng: 23.74947999804681
    },
    markers: []
  }
};

export default function mapReducer(state = defaultState, action) {

  let newState;
  let mergedState;

  switch(action.type) {

    case 'RECEIVED_PLACES':

      newState = {
        markers: []
      };

      forEach(action.places, place => {
        newState.markers.push({
          id: place._id,
          title: place.title,
          lat: place.latitude,
          lng: place.longitude
        })
      });

      return getMergedState(newState, state);

    default:
      return state;
  }

}
