import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { connect } from 'react-redux';
import { fetchPlace, cleanActivePlace, deletePlace } from '../../../actions/placeActions';
import { routeActions } from 'react-router-redux';
import Loader from '../../loader/loader.cmp';

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

    componentWillReceiveProps(newProps) {
      if (newProps.isDeleted && !this.props.isDeleted) {
        this.props.dispatch(routeActions.push('/places'));
      }
    }

    onDelete() {
      var placeId = this.props.place._id;
      this.props.deletePlace(placeId);
    }

    render() {

      if (this.props.isLoading || this.props.isDeleting) {
        return (
          <Loader />
        );
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
    isDeleting: state.places.isDeletingItem,
    isDeleted: state.places.isItemDeleted,
    placeId: ownProps.params.id,
    place: state.places.activeItem
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPlace: (placeId) => dispatch(fetchPlace(placeId)),
    cleanActivePlace: (isForEdit) => dispatch(cleanActivePlace(isForEdit)),
    deletePlace: (placeId) => dispatch(deletePlace(placeId)),
    dispatch: dispatch
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaceView);
