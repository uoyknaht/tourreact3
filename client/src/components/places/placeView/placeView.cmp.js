import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { connect } from 'react-redux';
import { fetchPlace } from '../../../actions/placeActions';

class PlaceView extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    componentDidMount() {
      const placeId = this.props.placeId;
      this.props.fetchPlace(placeId);
    }

    render() {

      if (this.props.isLoading) {
        return <div>
          <div className="progress">
            <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: 40 + '%'}}>
            </div>
          </div>

        </div>
      }

      var place = this.props.place;

        return (

            <div className="container-fluid">

              <div className="row">
                <div className="col-md-6">

                  <div className="page-header">
                    <h1>{place.title} <small>Category</small></h1>
                  </div>

                  <p>Address: {place.address}</p>
                  <p>Latitude: {place.latitude}</p>
                  <p>Longitude: {place.longitude}</p>




                </div>
                <div className="col-md-6"></div>
              </div>
            </div>

        );
    }

}

function mapStateToProps(state,ownProps) {
  return {
    isLoading: state.places.isFetchingItem,
    placeId: ownProps.params.id,
    place: state.places.activeItem
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPlace: (placeId) => dispatch(fetchPlace(placeId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaceView);
