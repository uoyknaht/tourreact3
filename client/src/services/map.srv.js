
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

}

export default new MapService();
