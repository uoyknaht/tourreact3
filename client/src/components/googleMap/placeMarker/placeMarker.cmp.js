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

    let map = this.props.map;
    let latLng = this.props.latLng
	let options = this.props.options;

    // if (this.props.animation) {
    //     marker.animation = this.props.animation;
    // }

    let marker = new CustomMarker(latLng, map, options);

    marker.addListener('click', () => {
        this.props.options.onClick(options.id, marker, map);
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

        if (this.props.options.draggable !== newProps.options.draggable) {
            this.state.marker.setDraggable(newProps.options.draggable);
        }
    }

  render() {
    return (
       <div>{this.props.options.text}</div>
    );
  }
}

PlaceMarker.propTypes = {
	latLng: React.PropTypes.shape({
		lat: React.PropTypes.number.isRequired,
		lng: React.PropTypes.number.isRequired,
    }),
	map: React.PropTypes.any.isRequired,
	options: React.PropTypes.shape({
		id: React.PropTypes.any.isRequired,
		text: React.PropTypes.string.isRequired,
		className: React.PropTypes.string.isRequired,
		// animation: React.PropTypes.string,
		onClick: React.PropTypes.func,
		draggable: React.PropTypes.bool,
		onDragEnd: React.PropTypes.func,
		width: React.PropTypes.number,
		height: React.PropTypes.number,
		markerEdgeOffsetLeft: React.PropTypes.number,
		markerEdgeOffsetTop: React.PropTypes.number
    })
};

export default PlaceMarker;
