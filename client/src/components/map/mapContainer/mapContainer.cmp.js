import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { clickMap, clickMarker, markerDragEnd } from '../../../actions/mapActions';
import { connect }            from 'react-redux';
// import React, {PropTypes, Component} from 'react/addons';
import { routeActions } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
// import GoogleMap from 'google-map-react';
import GoogleMap from '../../googleMap/map/map.cmp.js';
import Marker from '../../googleMap/marker/marker.cmp.js';




class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this._onBoundsChange = this._onBoundsChange.bind(this);
    this._onMarkerClick = this._onMarkerClick.bind(this);
    this._onMarkerMouseDown = this._onMarkerMouseDown.bind(this);
    this._onMarkerMouseUp = this._onMarkerMouseUp.bind(this);
    this._onMarkerMouseMove = this._onMarkerMouseMove.bind(this);

    this._draggableMarker = null;
  }

  _onBoundsChange(center, zoom, bounds, marginBounds) {
    // console.log(`new center: ${center}`);
    // console.log(`new zoom: ${zoom}`);
    // console.log(`new bounds: ${bounds}`);
    // console.log(`new marginBounds: ${marginBounds}`);
  }

  _onMarkerClick(markerId, marker) {
      this.props.dispatch(routeActions.push(`/places/${markerId}`));
  }

  _onMarkerMouseDown(markerId, marker, a) {
    this._draggableMarker = marker;
  }

  _onMarkerMouseUp(markerId, marker, dragData) {
    this.props.dragMarker(markerId, dragData.lat, dragData.lng);
    // console.log(markerId);
      // this.props.dispatch(routeActions.push(`/places/${markerId}`));
  }

  _onMarkerMouseMove(markerId, marker, dragData) {

      // console.log(markerId);
      // console.log(a);
      // marker.lat = a.lat;
      // marker.lng = a.lng;
  }


  render() {

    const defaultMapCenter = {lat: 55.44251502256722, lng: 23.74947999804681};
    const defaultMapZoom = 7;

	if (!this.props.markers) {
		return (
			<div></div>
		);
	}

    let markersHtml = this.props.markers.map(marker => {
        return <Marker
				lat={marker.get('lat')}
				lng={marker.get('lng')}
				text={marker.get('title')}
				draggable={marker.get('draggable')}
				animation={marker.get('animation')}
				onDragEnd={this.props.markerDragEnd}
				key={marker.get('id')} />
    });

    return (
        <div style={{width: 500 + 'px', height: 500 + 'px'}}>

            <GoogleMap
                initialCenter={[54.95,23.8]}
                initialZoom={12}
				onClick={this.props.clickMap}>

                {markersHtml}
            </GoogleMap>

      </div>
    );
  }
}

MapContainer.prototype.shouldComponentUpdate = shouldPureComponentUpdate;

function mapStateToProps(state) {
  return {
    center: state.getIn(['map', 'center']),
    zoom: state.getIn(['map', 'zoom']),
    areMarkersDraggable: state.getIn(['map', 'areMarkersDraggable']),
    markers: state.getIn(['map', 'markers'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickMap: (latLng) => dispatch(clickMap(latLng, map)),
    clickMarker: (markerId) => dispatch(clickMarker(markerId)),
    markerDragEnd: (markerId, newLat, newLng) => dispatch(markerDragEnd(markerId, newLat, newLng)),
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
