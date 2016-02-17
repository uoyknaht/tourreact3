import React from 'react';
import CustomMarker from '../customMarker.class';

class PlaceMarker extends React.Component {

  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.state = {
        marker: null,
        dragEndListener: null
    };
  }

  componentWillMount() {

    var map = window.map;

    let latLng = {
        lat: this.props.lat,
        lng: this.props.lng
    };

    let options = {
        className: 'tr-marker'
    };

    if (this.props.animation) {
        marker.animation = this.props.animation;
    }

    let marker = new CustomMarker(latLng, map, options);

    marker.addListener('click', () => {
        this.props.onClick(this.props.id, marker, map);
    });

    this.setState({
        marker: marker
    });
  }

  componentWillUnmount () {
    var marker = this.state.marker;
    marker.setMap(null);
  }

    componentWillReceiveProps(newProps) {

        if (!this.state.marker) {
            return;
        }

        if (this.props.draggable !== newProps.draggable) {
            var marker = this.state.marker;
            let dragEndListener;

            marker.setDraggable(newProps.draggable);

            if (newProps.draggable) {
                dragEndListener = google.maps.event.addListener(marker, 'dragend', () => {
                    let newLat = marker.position.lat();
                    let newLng = marker.position.lng();
                    this.props.onDragEnd(newLat, newLng);
                });
            } else  {
                if (this.state.dragEndListener) {
                    google.maps.event.removeListener(this.state.dragEndListener);
                    dragEndListener = null;
                }
            }

            this.setState({
                marker: marker,
                dragEndListener: dragEndListener
            });
        }
    }

  render() {
    return (
       <div>{this.props.text}</div>
    );
  }
}

PlaceMarker.propTypes = {
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    draggable: React.PropTypes.bool,
    //onDragEnd: React.PropTypes.function
    // onClick
    // animation
};

export default PlaceMarker;
