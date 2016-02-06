import fetch from 'isomorphic-fetch'

export function requestPlaces() {
  console.log('requestPlaces (action)');
  return {
    type: 'REQUEST_PLACES'
  }
}

export function fetchPlaces() {
  console.log('fetchPlaces (action)');
  return function (dispatch) {
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

export function addPlace(place) {
  return {
    type: 'ADD_PLACE',
    place
  }
}

export function editPlace(id, place) {
  return {
    type: 'EDIT_PLACE',
    id,
    place
  };
}

export function removePlace(id) {
  return {
    type: 'REMOVE_PLACE',
    id
  };
}
