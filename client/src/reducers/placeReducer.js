import Immutable from 'immutable';

const defaultState = new Immutable.List();

export default function placeReducer(state = defaultState, action) {

  switch(action.type) {
    case 'ADD_PLACE':
      return state.concat(action.place);
    case 'EDIT_PLACE':
      return state.set(action.id, action.place);
    case 'REMOVE_PLACE':
      return state.delete(action.id);
    default:
      return state;
  }
  
}
