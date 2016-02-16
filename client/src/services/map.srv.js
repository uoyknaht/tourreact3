
class MapService {

	createMarker(latLng, map) {
		return new google.maps.Marker({
			position: latLng,
			map: map
		});
	}

}

export default new MapService();
