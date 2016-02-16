
class MapService {

	createMarker(latLng, map) {
		return new google.maps.Marker({
			position: latLng,
			map: map
		});
	}

	getCurrentCenter(map) {
		let center = map.getCenter();

		return {
			lat: center.lat(),
			lng: center.lng()
		};
	}

	panMapToLatLng(latLng, map) {
		var latLng = new google.maps.LatLng(latLng.lat, latLng.lng);
	    map.panTo(latLng);
	}

}

export default new MapService();
