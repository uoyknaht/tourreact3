import React from 'react';

class Marker extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {

    var map = window.map;

    new google.maps.Marker({
        position: {
            lat: this.props.lat,
            lng: this.props.lng
        },
        map: map
    });

  }

  render() {
    return (
       <div></div>
    );
  }
}

Marker.propTypes = {
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired
};

export default Marker;