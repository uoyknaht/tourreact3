import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { connect } from 'react-redux';
import { fetchPlace, cleanActivePlace, deletePlace } from '../../../actions/placeActions';
import { routeActions } from 'react-router-redux'

function goToPlaceList() {
  routeActions.push('places');
}

class PlaceView extends React.Component {

    constructor() {
        super();
        this.onDelete = this.onDelete.bind(this);
        this.render = this.render.bind(this);
    }

    componentDidMount() {
      const placeId = this.props.placeId;
      this.props.fetchPlace(placeId);
    }

    componentWillUnmount() {
      this.props.cleanActivePlace();
    }

    onDelete() {
      var placeId = this.props.place._id;
      this.props.deletePlace(placeId);

      //this.props.goToPlaceList();
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

      if (!place) {
        return (
          <div></div>
        );
      }

        return (

            <div>

                  <div className="page-header">
                    <h1>{place.title} <small>Category</small></h1>
                  </div>
                  <div>
                    <Link to={`/places/${place._id}/edit`}>Edit</Link> | <a href="#" onClick={this.onDelete}>Delete</a>
                  </div>
                  <br/>

                  <p>Address: {place.address}</p>
                  <p>Latitude: {place.latitude}</p>
                  <p>Longitude: {place.longitude}</p>


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
    fetchPlace: (placeId) => dispatch(fetchPlace(placeId)),
    cleanActivePlace: (isForEdit) => dispatch(cleanActivePlace(isForEdit)),
    deletePlace: (placeId) => dispatch(deletePlace(placeId)),
    goToPlaceList: () => dispatch(goToPlaceList())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaceView);
