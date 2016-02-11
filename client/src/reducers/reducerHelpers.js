
export default function getMergedState(newState, currentState) {
  return currentState.mergeDeep(newState);
  // return Object.assign({}, currentState, newState);
}