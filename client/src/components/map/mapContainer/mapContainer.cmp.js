import React from 'react';
// import React, {PropTypes, Component} from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import Marker from '../marker/marker.cmp';

class MapContainer extends React.Component {

  // static defaultProps = {
  //   center: {lat: 59.938043, lng: 30.337157},
  //   zoom: 9,
  //   greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  // };

  

  constructor(props) {
    super(props);
    // this.shouldComponentUpdate = shouldPureComponentUpdate;
  }

  // render() {
  //   return (
  //      <GoogleMap
  //       defaultCenter={{lat: 59.938043, lng: 30.337157}}
  //       defaultZoom={9}>
  //       <Marker lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
  //       <Marker lat={59.724465} lng={30.080121} text={'B'} /* road circle */ />
  //     </GoogleMap>
  //   );
  // }

  render() {
    return (
        <div style={{width: 500 + 'px', height: 500 + 'px'}}>
       
       <GoogleMap
        defaultCenter={{lat: 59.938043, lng: 30.337157}}
        defaultZoom={9}>
      </GoogleMap>
      </div>
    );
  }
}

MapContainer.prototype.shouldComponentUpdate = shouldPureComponentUpdate;

export default MapContainer;