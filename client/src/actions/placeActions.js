import fetch from 'isomorphic-fetch'
import apiService from '../services/api.srv'

export function requestPlaces() {
  return {
    type: 'REQUEST_PLACES'
  }
}

function shouldFetchPlaces(state) {
  if (state.getIn(['places', 'isFetchingItems'])) {
    return false;
  }

  if (state.getIn(['places', 'areItemsFetched'])) {
    return false;
  }

  return true;
}

export function fetchPlaces() {
  return function (dispatch, getState) {
    if (!shouldFetchPlaces(getState())) {
      return;
    }

    dispatch(requestPlaces());

    return fetch('http://localhost:8081/api/places')
      .then(response => response.json())
      .then((json) => {
        dispatch(receivedPlaces(json))
      })
  }
}

export function receivedPlaces(places) {
  return {
    type: 'RECEIVED_PLACES',
    places
  }
}

export function requestPlace(placeId, isForEdit) {
  return {
    type: 'REQUEST_PLACE',
    placeId,
    isForEdit
  }
}

export function fetchPlace(placeId, isForEdit) {
  return function (dispatch) {
    dispatch(requestPlace(isForEdit));

    return fetch(`http://localhost:8081/api/places/${placeId}`)
      .then(response => response.json())
      .then((json) => {
        dispatch(receivedPlace(json, isForEdit))
      })
  }
}

export function receivedPlace(place, isForEdit) {
  return {
    type: 'RECEIVED_PLACE',
    place,
    isForEdit
  }
}

export function cleanActivePlace(isForEdit) {
  return {
    type: 'CLEAN_ACTIVE_PLACE',
    isForEdit
  }
}

export function openPlaceCreateOrUpdateForm() {
  return {
    type: 'OPEN_PLACE_CREATE_OR_UPDATE_FORM',
  };
}

export function closePlaceCreateOrUpdateForm() {
  return {
    type: 'CLOSE_PLACE_CREATE_OR_UPDATE_FORM',
  };
}

export function requestCreatePlace() {
  return {
    type: 'REQUEST_CREATE_PLACE',
  };
}

export function createPlace(newPlace) {
  return function (dispatch) {
    dispatch(requestCreatePlace());

    return apiService.post(`http://localhost:8081/api/places`, newPlace)
        .then(json => dispatch(responseCreatePlace(json)))
        .catch((err) => dispatch(responseCreatePlaceError(err)));
  }
}

export function responseCreatePlace(createdPlace) {
  return {
    type: 'RESPONSE_CREATE_PLACE',
    createdPlace
  }
}

export function responseCreatePlaceError(err) {
  return {
    type: 'RESPONSE_CREATE_PLACE_ERROR',
    err
  }
}

///
///
///

export function requestUpdatePlace() {
  return {
    type: 'REQUEST_UPDATE_PLACE',
  };
}

export function updatePlace(newPlace) {
  return function (dispatch) {
    dispatch(requestUpdatePlace());

    // return apiService.put(`http://localhost:8081/api/places/${newPlace._id}`, newPlace)
    return apiService.post(`http://localhost:8081/api/places/${newPlace._id}/edit`, newPlace)
        .then(json => dispatch(responseUpdatePlace(json)))
        .catch(err => dispatch(responseUpdatePlaceError()));
  }
}

export function responseUpdatePlace(updatedPlace) {
  return {
    type: 'RESPONSE_UPDATE_PLACE',
    updatedPlace
  }
}

export function responseUpdatePlaceError(updatedPlace) {
    // debugger;
  return {
    type: 'RESPONSE_UPDATE_PLACE_ERROR',
  }
}

///
///
///

export function requestDeletePlace(placeId) {
  return {
    type: 'REQUEST_DELETE_PLACE',
    placeId
  };
}

export function deletePlace(placeId) {
  return function (dispatch) {
    dispatch(requestDeletePlace(placeId));

    return apiService.delete(`http://localhost:8081/api/places/${placeId}`)
        .then( function() {
          dispatch(responseDeletePlace(true, placeId));
        })
        .catch(() => dispatch(responseDeletePlace(false, placeId)));
  }
}

export function responseDeletePlace(isSuccess, placeId) {
  return {
    type: 'RESPONSE_DELETE_PLACE',
    isSuccess,
    placeId
  }
}
