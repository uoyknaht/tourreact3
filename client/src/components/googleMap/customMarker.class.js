// http://humaan.com/custom-html-markers-google-maps/

function CustomMarker(latLng, map, args) {
    this.latlng = new google.maps.LatLng(latLng.lat, latLng.lng);   
    this.args = args || {};
    this.setMap(map);
    this.map = map;
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
    var self = this;
    
    var div = this.div;
    
    if (!div) {
    
        div = this.div = document.createElement('div');
        
        div.className = this.args.className || 'marker';
        
        div.style.position = 'absolute';
        div.style.width = '20px';
        div.style.height = '20px';
        // http://jsfiddle.net/doktormolle/QRuW8/
        // https://developers.google.com/maps/documentation/javascript/customoverlays
        div.draggable = true;
        
        if (typeof(self.args.marker_id) !== 'undefined') {
            div.dataset.marker_id = self.args.marker_id;
        }
        
        google.maps.event.addDomListener(div, "click", function(event) {            
            google.maps.event.trigger(self, "click");
        });

        var that = this;

        google.maps.event.addDomListener(div,
            'mousedown',
            function(e) {
                div.style.cursor = 'move';
                that.map.set('draggable', false);
                that.set('origin', e);

                that.moveHandler = google.maps.event.addDomListener(that.get('map').getDiv(),
                    'mousemove',
                    function(e) {
                        var origin = that.get('origin');
                        var left = origin.clientX - e.clientX;
                        var top = origin.clientY - e.clientY;                    
                        // var point = that.getProjection().fromLatLngToDivPixel(latLng);

                        var lat = that.getPosition().lat();
                        var lng = that.getPosition().lng();
                        var latLng =  new google.maps.LatLng(lat, lng); 

                        // var pos = that.getProjection().fromLatLngToDivPixel(that.get('position'));
                        var pos = that.getProjection().fromLatLngToDivPixel(latLng);

                        that.set('origin', e);
// debugger;
                        that.latlng = latLng;
                        // that.set('position', latLng);
                        that.draw();


                        // console.log(pos);

// // debugger;
//                         // var pos = that.getProjection();
//                         console.log(that.get('position'));
//                         console.log(that);



                        //     
                        //     .fromLatLngToDivPixel(that.get('position')),
                        //     latLng = that.getProjection()
                        //     .fromDivPixelToLatLng(new google.maps.Point(pos.x - left, pos.y - top));

                        // that.set('origin', e);
                        // that.set('position', latLng);
                        // that.draw();
                    });


            }
        );

        google.maps.event.addDomListener(div, 'mouseup', function() {
            that.map.set('draggable', true);
            div.style.cursor = 'default';
            google.maps.event.removeListener(that.moveHandler);
        });







        
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }
    
    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
    
    if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
    }
};

CustomMarker.prototype.onAdd = function() {

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

export default CustomMarker;