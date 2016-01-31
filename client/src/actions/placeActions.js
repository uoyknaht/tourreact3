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
