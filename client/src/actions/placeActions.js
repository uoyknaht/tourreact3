import fetch from 'isomorphic-fetch'
import apiService from '../services/api.srv'
import { getPlaceListFilterQuery } from '../services/filters.srv'

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function getPlaces(filterQuery) {
  return function (dispatch, getState) {
    if (!shouldGetPlaces(getState())) {
      return;
    }

    dispatch(requestGetPlaces());

    return apiService.get(`http://localhost:8081/api/places${filterQuery}`)
        .then(
            json => dispatch(responseGetPlaces(json)),
            error => dispatch(responseGetPlacesError(error))
        )
  }
}

function requestGetPlaces() {
  return {
    type: 'REQUEST_GET_PLACES'
  }
}

function responseGetPlaces(places) {
  return {
    type: 'RESPONSE_GET_PLACES',
    places
  }
}

function responseGetPlacesError(error) {
  return {
    type: 'RESPONSE_GET_PLACES_ERROR',
    error
  }
}

function shouldGetPlaces(state) {
  if (state.getIn(['places', 'isFetchingItems'])) {
    return false;
  }

  if (state.getIn(['places', 'areItemsFetched'])) {
    // return false;
  }

  return true;
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function getPlace(placeId, isForEdit) {
  return function (dispatch) {
    dispatch(requestGetPlace(isForEdit));

    return apiService.get(`http://localhost:8081/api/places/${placeId}`)
        .then(
			json => dispatch(responseGetPlace(json, isForEdit)),
			error => dispatch(responseGetPlaceError(error))
		)
  }
}

function requestGetPlace(placeId, isForEdit) {
  return {
    type: 'REQUEST_GET_PLACE',
    placeId,
    isForEdit
  }
}

function responseGetPlace(place, isForEdit) {
  return {
    type: 'RESPONSE_GET_PLACE',
    place,
    isForEdit
  }
}

function responseGetPlaceError(error) {
  return {
    type: 'RESPONSE_GET_PLACE_ERROR',
    error
  }
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function cleanActivePlace(isForEdit) {
  return {
    type: 'CLEAN_ACTIVE_PLACE',
    isForEdit
  }
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function openPlaceCreateForm() {
  return {
    type: 'OPEN_PLACE_CREATE_FORM',
  };
}

export function closePlaceCreateForm() {
  return {
    type: 'CLOSE_PLACE_CREATE_FORM',
  };
}

export function openPlaceUpdateForm(placeId) {
  return {
    type: 'OPEN_PLACE_UPDATE_FORM',
	placeId
  };
}

export function closePlaceUpdateForm(placeId) {
  return {
    type: 'CLOSE_PLACE_UPDATE_FORM',
	placeId
  };
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function createTempPlace(latLng) {
	return {
		type: 'CREATE_TEMP_PLACE',
		latLng
    };
}

export function deleteTempPlace() {
	return {
		type: 'DELETE_TEMP_PLACE',
    };
}

export function createPlace(newPlace) {
  return function (dispatch) {
    dispatch(requestCreatePlace());

    return apiService.post(`http://localhost:8081/api/places`, newPlace)
        .then(json => dispatch(responseCreatePlace(json)))
        .catch((error) => dispatch(responseCreatePlaceError(error)));
  }
}

function requestCreatePlace() {
  return {
    type: 'REQUEST_CREATE_PLACE',
  };
}

function responseCreatePlace(createdPlace) {
  return {
    type: 'RESPONSE_CREATE_PLACE',
    createdPlace
  }
}

function responseCreatePlaceError(err) {
  return {
    type: 'RESPONSE_CREATE_PLACE_ERROR',
    err
  }
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function updatePlace(newPlace) {
  return function (dispatch) {
    dispatch(requestUpdatePlace());

    // return apiService.put(`http://localhost:8081/api/places/${newPlace._id}`, newPlace)
    return apiService.post(`http://localhost:8081/api/places/${newPlace._id}/edit`, newPlace)
        .then(json => dispatch(responseUpdatePlace(json)))
        .catch(error => dispatch(responseUpdatePlaceError(error)));
  }
}

function requestUpdatePlace() {
  return {
    type: 'REQUEST_UPDATE_PLACE',
  };
}

function responseUpdatePlace(updatedPlace) {
  return {
    type: 'RESPONSE_UPDATE_PLACE',
    updatedPlace
  }
}

export function responseUpdatePlaceError(updatedPlace) {
  return {
    type: 'RESPONSE_UPDATE_PLACE_ERROR',
  }
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function deletePlace(placeId) {
  return function (dispatch) {
    dispatch(requestDeletePlace(placeId));

    return apiService.delete(`http://localhost:8081/api/places/${placeId}`)
        .then( function() {
          dispatch(responseDeletePlace(placeId));
        })
        .catch((error) => dispatch(responseDeletePlaceError(error)));
  }
}

export function requestDeletePlace(placeId) {
  return {
    type: 'REQUEST_DELETE_PLACE',
    placeId
  };
}

export function responseDeletePlace(placeId) {
  return {
    type: 'RESPONSE_DELETE_PLACE',
    placeId
  }
}

export function responseDeletePlaceError(error) {
  return {
    type: 'RESPONSE_DELETE_PLACE_ERROR',
    error
  }
}


/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function onChangePlaceCoords(placeId, latLng) {
    return {
        type: 'CHANGED_PLACE_COORDS',
        placeId,
        latLng
    }
}
