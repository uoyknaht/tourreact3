import React from 'react';
// import Router from 'react-router';
// import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
// import { connect } from 'react-redux';
// import { fetchPlace, cleanActivePlace, deletePlace } from '../../../actions/placeActions';
// import { routeActions } from 'react-router-redux';
// import Loader from '../../loader/loader.cmp';

class GoogleMap extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.state = {
            isApiLoaded: false,
            map: {}
        };
    }

    componentDidMount() {

        var map = new google.maps.Map(
            document.getElementById('google-map'),
            {
                center: new google.maps.LatLng(this.props.initialCenter[0], this.props.initialCenter[1]),
                zoom: this.props.initialZoom
            }
        );

		map.addListener('click', (e) => {
			if (this.props.onClick) {
				let latLng = {
					lat: e.latLng.lat(),
					lng: e.latLng.lng()
				};

				this.props.onClick(latLng, map);
			}
	    });

        // TODO: find how to pass as props to marker cmp
        window.map = map;

        this.setState({
            isApiLoaded: true,
            map: map
        });

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(newProps) {

    }

    render() {

        // if (!this.state.isApiLoaded) {
        //     return (
        //         <div></div>
        //     );
        // }

        return (
            <div>
                <div id="google-map" className="google-map"></div>
                {this.props.children}
            </div>
        );
    }

}

GoogleMap.propTypes = {
    initialZoom: React.PropTypes.number.isRequired,
    initialCenter: React.PropTypes.array.isRequired
    // onClick: React.PropTypes.function
};

export default GoogleMap;

      //  <GoogleMap
      //     defaultCenter={defaultMapCenter}
      //     defaultZoom={defaultMapZoom}
      //     onBoundsChange={this._onBoundsChange}
      //     onChildClick={this._onMarkerClick}
      //     draggable={this.props.isDraggable}
      //     onChildMouseDown={this._onMarkerMouseDown}
      //     onChildMouseUp={this._onMarkerMouseUp}
      //     onChildMouseMove={this._onMarkerMouseMove}
      //     >
      //     {markersHtml}
      // </GoogleMap>

// function mapStateToProps(state,ownProps) {
//   return {
//     isLoading: state.places.isFetchingItem,
//     isDeleting: state.places.isDeletingItem,
//     isDeleted: state.places.isItemDeleted,
//     placeId: ownProps.params.id,
//     place: state.places.activeItem
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchPlace: (placeId) => dispatch(fetchPlace(placeId)),
//     cleanActivePlace: (isForEdit) => dispatch(cleanActivePlace(isForEdit)),
//     deletePlace: (placeId) => dispatch(deletePlace(placeId)),
//     dispatch: dispatch
//   }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(PlaceView);



      //   if (this.state.isApiLoaded) {
      //       return;
      //   }

      // var script = document.createElement('script');
      // script.type = 'text/javascript';
      // script.src = 'https://maps.googleapis.com/maps/api/js';
      // script.onload = () => {
      //   var map = new google.maps.Map(
      //       document.getElementById('google-map'),
      //       {
      //           center: new google.maps.LatLng(this.props.initialCenter[0], this.props.initialCenter[1]),
      //           zoom: this.props.initialZoom
      //       }
      //   );


      // };

      // document.body.appendChild(script);
