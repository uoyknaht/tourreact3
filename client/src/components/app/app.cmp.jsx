import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { connect }            from 'react-redux';
import Nav from '../nav/nav.cmp';
import PageTitle from '../pageTitle/pageTitle.cmp';
import MapContainer from '../map/mapContainer/mapContainer.cmp';
import PlacesContainer from '../places/placesContainer/placesContainer.cmp';

class App extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {
      return (
        <div>
            <Nav />
            <div className="tr-main-wrap">
                <PlacesContainer routeLocation={this.props.location} routeParams={this.props.params} />
                {this.props.children}
                <MapContainer />
            </div>
        </div>
      )
    }

}

function mapStateToProps(state, ownProps) {
	return {
        location: ownProps.location
	}
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
