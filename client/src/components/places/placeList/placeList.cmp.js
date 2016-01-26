import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

export default class PlaceList extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {

      var places = [
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
      ];

      var placesHtml = [];

      places.forEach(function (place) {
        placesHtml.push(
          <Link to="/places/:id" params="{id: place._id}" className="list-group-item">
            <h4 className="list-group-item-heading">{place.title}</h4>
            <p className="list-group-item-text">...</p>
          </Link>
        );
      });

        return (

            <div>
              Place list: <br/>

              <div class="list-group">
                {placesHtml}
              </div>

            </div>

        );
    }

}
