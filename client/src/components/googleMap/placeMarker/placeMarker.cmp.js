import React from 'react';
import CustomMarker from '../customMarker.class';
import { ANIMATION_DROP, ANIMATION_SHOWITSELF } from '../constants';

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
	    let marker = new CustomMarker(latLng, map, options);

	    marker.addListener('click', () => {
	        this.props.options.onClick(options.id, marker, map);
	    });

		if (marker) {
            if (options.animation) {
                marker.animate(options.animation);
            }

            if (options.draggable) {
                setTimeout(() => {
                    marker.setDraggable(options.draggable);
                })
            }            
		}

	    this.setState({
	        marker: marker
	    });
	}

	componentWillUnmount () {
		let marker = this.state.marker;
		marker.setMap(null);
	}

    componentWillReceiveProps(newProps) {

        if (!this.state.marker) {
            return;
        }

        if (this.props.options.draggable !== newProps.options.draggable) {
            this.state.marker.setDraggable(newProps.options.draggable);
        }

        if (newProps.options.animation
			&& this.props.options.animation !== newProps.options.animation) {

			this.state.marker.animate(newProps.options.animation);
        }

        if (this.props.latLng !== newProps.latLng) {
            this.state.marker.setPosition(newProps.latLng)
        }        
    }

  render() {
    return (
       <div></div>
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
		animation: React.PropTypes.oneOf([null, ANIMATION_DROP, ANIMATION_SHOWITSELF]),
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
