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
import PlaceMarker from '../../googleMap/placeMarker/placeMarker.cmp';

class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this._onBoundsChange = this._onBoundsChange.bind(this);
    this._onMarkerClick = this._onMarkerClick.bind(this);
    this._onMarkerMouseDown = this._onMarkerMouseDown.bind(this);
    this._onMarkerMouseUp = this._onMarkerMouseUp.bind(this);
    this._onMarkerMouseMove = this._onMarkerMouseMove.bind(this);
    this.render = this.render.bind(this);

    this._draggableMarker = null;
  }

	_onMarkerClick(markerId, marker, map) {
		// TODO: decide where this should be handled
		this.props.dispatch(routeActions.push(`/places/${markerId}`));
		// this.props.clickMarker(markerId, marker);
	}



  _onBoundsChange(center, zoom, bounds, marginBounds) {
    // console.log(`new center: ${center}`);
    // console.log(`new zoom: ${zoom}`);
    // console.log(`new bounds: ${bounds}`);
    // console.log(`new marginBounds: ${marginBounds}`);
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

		let latLng = {
			lat: marker.get('lat'),
			lng: marker.get('lng')
		};

		let map = window.map;

		let options = {
			id: marker.get('id'),
			text: marker.get('title'),
			draggable: marker.get('draggable'),
			animation: marker.get('animation'),
			onClick: this._onMarkerClick,
			onDragEnd: this.props.markerDragEnd,
			className: 'tr-marker',
			width: 40,
			height: 40,
		    markerEdgeOffsetLeft: 20,
	        markerEdgeOffsetTop: 60
		};

        return <PlaceMarker
			latLng={latLng}
			map={map}
			options={options}
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

function mapStateToProps(state, ownProps) {
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
    clickMarker: (placeId, marker) => dispatch(clickMarker(placeId, marker)),
    markerDragEnd: (newLat, newLng) => dispatch(markerDragEnd(newLat, newLng)),
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
