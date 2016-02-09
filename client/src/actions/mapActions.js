
export function clickMarker() {
  return {
    type: 'CLICK_MARKER'
  }
}

export function dragMarker(markerId, newLat, newLng) {
  return {
    type: 'DRAG_MARKER',
    markerId,
    newLat,
    newLng
  }
}
