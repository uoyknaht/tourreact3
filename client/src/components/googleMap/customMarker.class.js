// http://humaan.com/custom-html-markers-google-maps/

function CustomMarker(latLng, map, args) {
    this.latlng = new google.maps.LatLng(latLng.lat, latLng.lng);
    this.args = args || {};
    this.setMap(map);
    this.map = map;
	this._dragMouseDownListener = null;
	this._dragMouseUpListener = null;
    this.width = this.args.width || 20;
    this.height = this.args.height || 20;
    this.markerEdgeOffsetLeft = this.args.markerEdgeOffsetLeft || this.width / 2;
    this.markerEdgeOffsetTop = this.args.markerEdgeOffsetTop || this.height;
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.onAdd = function() {
    var self = this;

    var div = this.div;

    if (div) {
		return;
	}

    div = this.div = document.createElement('div');
    div.className = this.args.className || 'marker';
    div.style.position = 'absolute';
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';

    if (typeof(self.args.marker_id) !== 'undefined') {
        div.dataset.marker_id = self.args.marker_id;
    }

	// google.maps.event.addDomListener(this.div, 'click', (e) => {
 //        google.maps.event.trigger(this, 'click');
 //    });

    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
};

CustomMarker.prototype.draw = function() {
    var projection = this.getProjection();
    var point = projection.fromLatLngToDivPixel(this.latlng);
    // var offsetX = projection.fromContainerPixelToLatLng(this.markerEdgeOffsetLeft);
// console.log(offsetX);

    if (point) {
        this.div.style.left = point.x + 'px';
        this.div.style.top = point.y + 'px';
    }
};

CustomMarker.prototype.remove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }
};

CustomMarker.prototype.getPosition = function() {
    return this.latlng;
};

CustomMarker.prototype.setDraggable = function(isDraggable) {
	if (isDraggable) {
		enableDragging.call(this);
	}
	else {
		disableDragging.call(this);
	}
};

// http://jsfiddle.net/doktormolle/QRuW8/
// https://developers.google.com/maps/documentation/javascript/customoverlays
function enableDragging() {

	let wasDragged = false;

    this._dragMouseDownListener = google.maps.event.addDomListener(this.div, 'mousedown', (e) => {
		e.preventDefault();
		e.stopPropagation();

        this.div.style.cursor = 'move';
        this.map.set('draggable', false);
        this.set('origin', e);

		let mapDiv = this.get('map').getDiv();

        this.moveHandler = google.maps.event.addDomListener(mapDiv, 'mousemove', (e) => {
			wasDragged = true;

            var origin = this.get('origin');
            var left = origin.clientX - e.clientX;
            var top = origin.clientY - e.clientY;
            var lat = this.getPosition().lat();
            var lng = this.getPosition().lng();
            var currentLatLng =  new google.maps.LatLng(lat, lng);
            var pos = this.getProjection().fromLatLngToDivPixel(currentLatLng);
			var point = new google.maps.Point(pos.x - left, pos.y - top);




			var newLatLng = this.getProjection().fromDivPixelToLatLng(point);
            this.set('origin', e);
            this.latlng = newLatLng;
            this.draw();
        });
    });

    this._dragMouseUpListener = google.maps.event.addDomListener(this.div, 'mouseup', () => {
        this.map.set('draggable', true);
        this.div.style.cursor = 'default';
        google.maps.event.removeListener(this.moveHandler);

		if (wasDragged) {
			wasDragged = false;

			if (this.args.onDragEnd) {
				this.args.onDragEnd(this.getPosition().lat(), this.getPosition().lng());
			}
		}
    });
}

function disableDragging() {
	if (this._dragMouseDownListener) {
		google.maps.event.removeListener(this._dragMouseDownListener);
		google.maps.event.removeListener(this._dragMouseUpListener);

		this._dragMouseDownListener = null;
		this._dragMouseUpListener = null;
	}
}

export default CustomMarker;
