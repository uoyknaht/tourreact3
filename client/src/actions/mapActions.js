
export function clickMap(latLng, map) {
	return {
		type: 'CLICK_MAP',
		latLng,
		map
	}
}

export function clickMarker(placeId, marker) {
	return {
		type: 'CLICK_MARKER',
        placeId,
        marker
	}
}

export function markerDragEnd(lat, lng) {
	return {
		type: 'MARKER_DRAG_END',
		lat,
		lng
	}
}
