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
                <div className="tr-places-filter-container">
                    <PlacesFilter routeLocation={this.props.location} routeParams={this.props.params} />
                </div>
                <div className="tr-place-list-container">
                    <PlaceList places={this.props.places}
                        isFetchingPlaces={this.props.isFetchingPlaces} />
                </div>
                {this.props.children}                
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
	return {
	    isFetchingPlaces: state.getIn(['places', 'isFetchingPlaces']),
	    places: state.getIn(['places', 'visiblePlaces']),
        location: ownProps.location
	}
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesContainer);
