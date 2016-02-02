import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import ApiService from '../../../services/api.srv';
import {List} from 'immutable';
import { bindActionCreators } from 'redux';
import { fetchPlaces } from '../../../actions/placeActions';
import { connect }            from 'react-redux';

//@connect(state => ({ places: state.places }))
export default class PlaceList extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
          places: [
          {
            _id: 1,
            title: 'Raudondvario pilis'
          },
          {
            _id: 2,
            title: 'Netoniu kalnas'
          },
          {
            _id: 3,
            title: 'Lampedziu kempingas'
          }
        ]
      };
    }

    componentDidMount() {
      this.props.fetchPlaces();
    }

    // setPlaces(state, places) {
    //   return state.set('places', List(places));
    // }

    render() {

      // const { places, dispatch } = this.props;
      let places = this.props.places || [];
      var placesHtml = [];

      this.state.places.forEach(function (place) {
        placesHtml.push(
          <Link to={`/places/${place._id}`} className="list-group-item" key={place._id}>
            <h4 className="list-group-item-heading">{place.title}</h4>
            <p className="list-group-item-text">...</p>
          </Link>
        );
      });

        return (

            <div>
              Place list: <br/>

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
    places: state.places
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPlaces: () => dispatch(fetchPlaces())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);
