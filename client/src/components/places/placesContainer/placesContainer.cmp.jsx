import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
                    <PlacesFilter routeLocation={this.props.routeLocation} routeParams={this.props.routeParams} />
                </div>
                <div className="tr-place-list-container">
                    <PlaceList places={this.props.places}
                        isFetchingPlaces={this.props.isFetchingPlaces} />
                </div>
                <ReactCSSTransitionGroup 
                    transitionName="example"
                    transitionEnterTimeout={500} 
                    transitionLeaveTimeout={300}
                    transitionAppearTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}>                
                    {this.props.children}
                </ReactCSSTransitionGroup>               
            </div>
        );
    }

}

function mapStateToProps(state) {
	return {
	    isFetchingPlaces: state.getIn(['places', 'isFetchingPlaces']),
	    places: state.getIn(['places', 'visiblePlaces'])
	}
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesContainer);
