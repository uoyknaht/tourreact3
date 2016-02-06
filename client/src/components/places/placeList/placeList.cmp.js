import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { bindActionCreators } from 'redux';
import { fetchPlaces } from '../../../actions/placeActions';
import { connect }            from 'react-redux';
// import { routeActions } from 'react-router-redux'

//@connect(state => ({ places: state.places }))
class PlaceList extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
      this.props.fetchPlaces();
    }

    // setPlaces(state, places) {
    //   return state.set('places', List(places));
    // }

    render() {

      //  const { places } = this.props;
      let places = this.props.places;
      var placesHtml = [];

      console.log(places);
      console.log('---');
      console.log('---');

      places.forEach(function (place) {
        placesHtml.push(
          <Link to={`/places/${place._id}`} className="list-group-item" key={place._id}>
            <h4 className="list-group-item-heading">{place.title}</h4>
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
    // places: state.get('places')
    places: state.places.items
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPlaces: () => dispatch(fetchPlaces())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);
