import fetch from 'isomorphic-fetch'
import apiService from '../services/api.srv'
import { getFilteredPlaces, getPlaceById } from '../services/places.srv'

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function getPlaces(filterQuery) {
    return function (dispatch, getState) {
        if (!areFetched && isFetching) {
            return;
        }
        dispatch(requestGetPlaces());
        let state = getState();
        let areFetched = state.getIn(['places', 'arePlacesFetched'])
        let isFetching = state.getIn(['places', 'isFetchingPlaces'])
        
        if (!areFetched) {
            // return apiService.get(`http://localhost:8081/api/places${filterQuery}`)
            return apiService.get(`http://localhost:8081/api/places`)
            .then(
                places => {
                    state = getState();
                    let placeIdInQueue = state.getIn(['places', 'placeIdInQueue'])
                    dispatch(responseFetchPlaces(places))
                    dispatchFilteredPlaces(places)
                    if (placeIdInQueue) {
                        dispatch(removePlaceFromQueue())
                        dispatch(getPlace(placeIdInQueue, false))
                    }
                },
            error => dispatch(responseGetPlacesError(error))
            )
        } else {
            let places = state.getIn(['places', 'places']).toJS()
            dispatchFilteredPlaces(places)
        } 
        function dispatchFilteredPlaces(places) {
            let searchFilter = state.getIn(['filters', 'searchFilter'])
            let categoriesFilter = state.getIn(['filters', 'selectedCategoriesFilter']).toJS()
            let visiblePlaces = getFilteredPlaces(places, searchFilter, categoriesFilter)
            dispatch(responseGetPlaces(visiblePlaces))            
        }
    }
}

function requestGetPlaces() {
  return {
    type: 'REQUEST_GET_PLACES'
  }
}

function responseFetchPlaces(places) {
  return {
    type: 'RESPONSE_FETCH_PLACES',
    places
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

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function getPlace(placeId, isForEdit) {
    return function (dispatch, getState) {
        dispatch(requestGetPlace(isForEdit))
        let state = getState()
        let areFetched = state.getIn(['places', 'arePlacesFetched'])
        if (!areFetched) {
            dispatch(addPlaceToQueue(placeId))
            return
        }
        let places = state.getIn(['places', 'places']).toJS()
        let place = getPlaceById(places, placeId)
        dispatch(responseGetPlace(place, isForEdit))
        // return apiService.get(`http://localhost:8081/api/places/${placeId}`)
        //     .then(
        // 		json => dispatch(responseGetPlace(json, isForEdit)),
        // 		error => dispatch(responseGetPlaceError(error))
        // 	)
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

function addPlaceToQueue(placeId) {
  return {
    type: 'ADD_PLACE_TO_QUEUE',
    placeId
  }
}

function removePlaceFromQueue() {
  return {
    type: 'REMOVE_PLACE_FROM_QUEUE'
  }
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function setActivePlace(placeId) {
  return {
    type: 'SET_ACTIVE_PLACE',
    placeId
  }
}

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
