import fetch from 'isomorphic-fetch'
import apiService from '../services/api.srv'

export function requestPlaces() {
  console.log('requestPlaces (action)');
  return {
    type: 'REQUEST_PLACES'
  }
}

function shouldFetchPlaces(state) {
  if (state.places.isFetchingItems) {
    return false;
  }

  if (state.places.areItemsFetched) {
    return false;
  }

  return true;
}

export function fetchPlaces() {
  console.log('fetchPlaces (action)');
  return function (dispatch, getState) {
// debugger;
    if (!shouldFetchPlaces(getState())) {
      return;
    }

    dispatch(requestPlaces());

    // return fetch(`http://www.reddit.com/r/${subreddit}.json`)
    return fetch('http://localhost:8081/api/places')
      .then(response => response.json())
      .then((json) => {
        console.log('receivedPlaces (action)');
        dispatch(receivedPlaces(json))
      })
  }
}

export function receivedPlaces(places) {
  console.log('receivedPlaces (action)');
  return {
    type: 'RECEIVED_PLACES',
    places
  }
}

export function requestPlace(placeId, isForEdit) {
  console.log('requestPlace (action)');
  return {
    type: 'REQUEST_PLACE',
    placeId,
    isForEdit
  }
}

export function fetchPlace(placeId, isForEdit) {
  console.log('fetchPlace (action)');
  return function (dispatch) {
    dispatch(requestPlace(isForEdit));

    // return fetch(`http://www.reddit.com/r/${subreddit}.json`)
    return fetch(`http://localhost:8081/api/places/${placeId}`)
      .then(response => response.json())
      .then((json) => {
        dispatch(receivedPlace(json, isForEdit))
      })
  }
}

export function receivedPlace(place, isForEdit) {
  console.log('receivedPlace (action)');
  return {
    type: 'RECEIVED_PLACE',
    place,
    isForEdit
  }
}

export function cleanActivePlace(isForEdit) {
  console.log('cleanActivePlace (action)');
  return {
    type: 'CLEAN_ACTIVE_PLACE',
    isForEdit
  }
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
        .then(json => dispatch(responseCreatePlace(true, json)))
        .catch(() => dispatch(responseCreatePlace(false)));

    // return fetch(`http://localhost:8081/api/places`, {
    //       method: 'POST',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       body: newPlace
    //     })
    //     .then(response => response.json())
    //     .then(json => dispatch(responseUpdatePlace(json)))
    //     .catch(err => console.log(err));
  }
}

export function responseCreatePlace(isSuccess, createdPlace) {
  console.log('responseCreatePlace (action)');
  return {
    type: 'RESPONSE_CREATE_PLACE',
    createdPlace,
    isSuccess
  }
}

export function requestUpdatePlace() {
  return {
    type: 'REQUEST_UPDATE_PLACE',
  };
}

export function updatePlace(newPlace) {
  return function (dispatch) {
    dispatch(requestUpdatePlace());

    return fetch(`http://localhost:8081/api/places/${newPlace._id}`, {
          method: 'PUT',
          // headers: {
          //   'Accept': 'application/json',
          //   'Content-Type': 'application/json'
          // },
          body: newPlace
        })
        .then(response => response.json())
        .then(json => dispatch(responseUpdatePlace(json)))
        .catch(err => console.log(err));
  }
}

export function responseUpdatePlace(updatedPlace) {
  console.log('responseUpdatePlace (action)');
  return {
    type: 'RESPONSE_UPDATE_PLACE',
    updatedPlace
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


  //   return fetch(`http://localhost:8081/api/places/${placeId}`, {
  //         method: 'DELETE',
  //         // headers: {
  //         //   'Accept': 'application/json',
  //         //   'Content-Type': 'application/json'
  //         // },
  //       })
  //       .then(response => response.json())
  //       .then(json => dispatch(responseDeletePlace()))
  //       .catch(err => console.log(err));
  // }
  }
}

export function responseDeletePlace(isSuccess, placeId) {
  console.log('responseDeletePlace (action)');
  return {
    type: 'RESPONSE_DELETE_PLACE',
    isSuccess,
    placeId
  }
}
