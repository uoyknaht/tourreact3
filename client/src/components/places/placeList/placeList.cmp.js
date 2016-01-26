import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

export default class PlaceList extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {

        return (

            <div>
              Place list: <br/>

              <ul>
                <li><Link to="/places/1">place 1</Link></li>
                <li><Link to="/places/2">place 2</Link></li>
              </ul>

            </div>

        );
    }

}
