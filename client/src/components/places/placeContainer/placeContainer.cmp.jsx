import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { connect }            from 'react-redux';
import PlaceList from '../placeList/placeList.cmp';
import PlaceView from '../placeView/placeView.cmp';
import PlaceAddOrEdit from '../placeAddOrEdit/placeAddOrEdit.cmp';

class PlaceContainer extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {
        console.log(this.props.location)
      return (
        <div>
            <PlaceList places={this.props.places}
                location={this.props.location} />

        </div>
      )
    }

}

function mapStateToProps(state, ownProps) {
	return {
	    places: state.getIn(['places', 'places']),
        location: ownProps.location
	}
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceContainer);