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
            map: {}
        };
    }

    componentDidMount() {

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js';
      script.onload = () => {
        var map = new google.maps.Map(
            document.getElementById('google-map'), 
            {
                center: new google.maps.LatLng(this.props.initialCenter[0], this.props.initialCenter[1]),
                zoom: this.props.initialZoom
            }
        );

        this.setState({map: map});
      };

      document.body.appendChild(script);
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(newProps) {

    }


    render() {
        // var children = this.props.children;

        return (
            <div>
                <div id="google-map" className="google-map">a</div>
            </div>
        );
    }

}

GoogleMap.propTypes = {
    initialZoom: React.PropTypes.number.isRequired,
    initialCenter: React.PropTypes.array.isRequired
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
