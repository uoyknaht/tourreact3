import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { clickMarker } from '../../../actions/mapActions';
import { connect }            from 'react-redux';
// import React, {PropTypes, Component} from 'react/addons';
import { routeActions } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';
import Marker from '../marker/marker.cmp';





class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this._onBoundsChange = this._onBoundsChange.bind(this);
    this._onChildClick = this._onChildClick.bind(this);
  }

  _onBoundsChange(center, zoom, bounds, marginBounds) {
    // console.log(`new center: ${center}`);
    // console.log(`new zoom: ${zoom}`);
    // console.log(`new bounds: ${bounds}`);
    // console.log(`new marginBounds: ${marginBounds}`);
  }

  _onChildClick(markerId, marker) {
      this.props.dispatch(routeActions.push(`/places/${markerId}`));
    // const markerId = childProps.marker.get('id');
    // const index = this.props.markers.findIndex(m => m.get('id') === markerId);
    // if (this.props.onChildClick) {
    //   this.props.onChildClick(index);
    // }
  }

  render() {

    const defaultMapCenter = {lat: 55.44251502256722, lng: 23.74947999804681};
    const defaultMapZoom = 7;

// debugger;

if (!this.props.markers) {
  return (
    <div></div>
  );
}

  let  markersHtml = this.props.markers.map(marker => {
      return <Marker lat={marker.lat} lng={marker.lng} text={marker.title} key={marker.id} />
    });




    return (
        <div style={{width: 500 + 'px', height: 500 + 'px'}}>

       <GoogleMap
          defaultCenter={defaultMapCenter}
          defaultZoom={defaultMapZoom}
          onBoundsChange={this._onBoundsChange}
          onChildClick={this._onChildClick} >
          {markersHtml}
      </GoogleMap>
      </div>
    );
  }
}

MapContainer.prototype.shouldComponentUpdate = shouldPureComponentUpdate;

function mapStateToProps(state) {
  return {
    center: state.map.center,
    zoom: state.map.zoom,
    markers: state.map.markers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickMarker: (markerId) => dispatch(clickMarker(markerId)),
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
