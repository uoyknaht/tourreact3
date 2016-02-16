
export function clickMarker() {
	return {
		type: 'CLICK_MARKER'
	}
}

export function markerDragEnd(lat, lng) {
	return {
		type: 'MARKER_DRAG_END',
		lat,
		lng
	}
}
