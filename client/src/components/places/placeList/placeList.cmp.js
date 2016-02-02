import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import ApiService from '../../../services/api.srv';
import {List} from 'immutable';
import { bindActionCreators } from 'redux';
import * as placeActions       from '../../../actions/placeActions';
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
      var _this = this;

      ApiService.get('http://localhost:8081/api/places').then((response) => {
        _this.setState({places: response});
      })
    }

    setPlaces(state, places) {
      return state.set('places', List(places));
    }

    render() {

      const { places, dispatch } = this.props;



      var placesHtml = [];

      this.state.places.forEach(function (place) {
        placesHtml.push(
          <Link to="/places/:id" params="{id: place._id}" className="list-group-item" key={place._id}>
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
