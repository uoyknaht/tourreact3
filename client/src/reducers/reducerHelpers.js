
export default function getMergedState(newState, currentState) {
  return Object.assign({}, currentState, newState);
}
