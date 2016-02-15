import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { bindActionCreators } from 'redux';
import { getPlaces } from '../../../actions/placeActions';
import { connect }            from 'react-redux';
// import { routeActions } from 'react-router-redux'
import Loader from '../../loader/loader.cmp';

//@connect(state => ({ places: state.places }))
class PlaceList extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
      this.props.getPlaces();
    }

    render() {
      let places = this.props.places;

      if (!places) {
        return (
          <Loader />
        );
      }

      if (!places.size) {
        return (
          <div>No places</div>
        );
      }

      var placesHtml = [];

      places.forEach((place) => {
        placesHtml.push(
          <Link to={`/places/${place.get('_id')}`} className="list-group-item" key={place.get('_id')}>
            <h4 className="list-group-item-heading">{place.get('title')}</h4>
            <p className="list-group-item-text">...</p>
          </Link>
        );
      });

        return (
          <div>
            <Link to={`/places/actions/create`}>Create new</Link>
            <br/>
            <br/>
              <div className="list-group">
                {placesHtml}
              </div>
          </div>
        );
    }

}

function mapStateToProps(state) {
  return {
    places: state.getIn(['places', 'places'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaces: () => dispatch(getPlaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);
