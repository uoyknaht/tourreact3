import React from 'react';
import { Link } from 'react-router';
import { getPlaces } from '../../../actions/placeActions';
import { connect }            from 'react-redux';
import CategoryList from '../../categories/categoryList/categoryList.cmp';
import PlacesFilter from '../placesFilter/placesFilter.cmp'
import PlaceList from '../placeList/placeList.cmp'

class PlacesContainer extends React.Component {

    constructor() {
        super();        
        this.render = this.render.bind(this);
    }

    render() {
        let places = this.props.places;


        return (
            <div className="tr-main-block">
                <Link to={`/places/actions/create`}>Create new</Link>
                <PlacesFilter routeLocation={this.props.location} routeParams={this.props.params} />
                <br/>
                <PlaceList places={this.props.places} />
                {this.props.children}                
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(PlacesContainer);
