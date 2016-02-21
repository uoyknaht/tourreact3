import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import Nav from '../nav/nav.cmp';
import PageTitle from '../pageTitle/pageTitle.cmp';
import MapContainer from '../map/mapContainer/mapContainer.cmp';

export default class App extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {
      return (
        <div>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <PageTitle />
                        {this.props.children}
                    </div>
                    <div className="col-md-6">
						<MapContainer />
                    </div>
                </div>
            </div>
        </div>
      )
    }

}
