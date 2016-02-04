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
        return <div>Loading...</div>
      }

      var place = this.props.place;

        return (

            <div>
              Place view: {place.title}
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
