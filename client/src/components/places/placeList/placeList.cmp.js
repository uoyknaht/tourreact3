import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import $ from 'jquery';

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
      $.get('http://localhost:8081/api/places', function(res) {
        _this.setState({places: res});
      });

      // console.log(55555);
    }

    render() {





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
