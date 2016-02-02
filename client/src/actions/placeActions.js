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

export function getPlace(placeId) {
  console.log(555);
  return {
    type: 'GET_PLACE',
    placeId
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
