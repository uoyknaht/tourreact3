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

  componentWillUnMount() {
    var marker = this.state.marker;
    marker = null;
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
    text: React.PropTypes.string.isRequired
};

export default Marker;