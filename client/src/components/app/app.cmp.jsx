import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
                <ReactCSSTransitionGroup 
                    transitionName="example"
                    transitionEnterTimeout={500} 
                    transitionLeaveTimeout={300}
                    transitionAppearTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}>                
                    {this.props.children}
                </ReactCSSTransitionGroup>  
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
