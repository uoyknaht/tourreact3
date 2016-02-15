import React from 'react';

class Marker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        marker: null
    };
  }

  componentWillMount() {

    var map = window.map;

    var marker = new google.maps.Marker({
        position: {
            lat: this.props.lat,
            lng: this.props.lng
        },
        map: map
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
			marker.setDraggable(newProps.draggable);
			this.setState({ marker: marker });
		}
	}

  render() {
    return (
       <div>{this.props.text}</div>
    );
  }
}

Marker.propTypes = {
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
	draggable: React.PropTypes.bool
};

export default Marker;
