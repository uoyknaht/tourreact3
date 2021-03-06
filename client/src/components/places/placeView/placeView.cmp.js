import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { connect } from 'react-redux';
import { getPlace, cleanActivePlace, deletePlace, setActivePlace } from '../../../actions/placeActions';
import { routeActions } from 'react-router-redux';
import Loader from '../../loader/loader.cmp';
import NotFound from '../../notFound/notFound.cmp';
import { panMapToLatLng } from '../../../services/map.srv';
import { getPlaceIdFromSlug } from '../../../services/places.srv';
import { goToPlaceList } from '../../../services/router.srv';
import CategoriesTitlesList from '../../categories/categoriesTitlesList/categoriesTitlesList.cmp.js'

class PlaceView extends React.Component {

	constructor() {
		super();
		this.onDelete = this.onDelete.bind(this);
		this.render = this.render.bind(this);
	}

	componentDidMount() {
		const placeId = this.props.placeId;
		this.props.getPlace(placeId);
	}

	componentWillUnmount() {
		this.props.cleanActivePlace();
	}

	componentWillReceiveProps(newProps) {      
		if (newProps.placeId !== this.props.placeId) {
			this.props.getPlace(newProps.placeId);
		}
		else if (newProps.isDeleted && !this.props.isDeleted) {
			goToPlaceList(this.props.dispatch, this.props.selectedCategoriesFilter, this.props.searchFilter)
		}
        // received data of place which has to be shown
        else if (this.props.place !== newProps.place && newProps.place) {
            let latLng = {
                lat: newProps.place.get('latitude'),
                lng: newProps.place.get('longitude')
            };
            panMapToLatLng(latLng, window.map);
            this.props.setActivePlace(newProps.place.get('_id'));
        }       
	}

	onDelete() {
		var placeId = this.props.place.get('_id');
		this.props.deletePlace(placeId);
	}

	render() {

		if (this.props.isLoading || this.props.isDeleting) {
			return (
                <div className="tr-main-block tr-place-view-container">
				    <Loader />
                </div>
			);
		}

		var place = this.props.place;

		if (!place) {
			return (
				<NotFound />
			);
		}

        let addressApproximateText = '';

        if (place.get('isAddressApproximate')) {
            addressApproximateText = (<p className="help-block">Address is approximate</p>);
        }

		return (
			<div className="tr-main-block tr-place-view-container">
		        <h2 className="tr-place-view-title">{place.get('title')}</h2>
				<div>
					<Link to={`/places/${place.get('slug')}/edit`}>Edit</Link> | <a href="#" onClick={this.onDelete}>Delete</a>
				</div>
				<br/>

				<p>Address: {place.get('address')}</p>
                {addressApproximateText}
				<p>Latitude: {place.get('latitude')}</p>
                <p>Longitude: {place.get('longitude')}</p>
				<p>
                    Categories:&nbsp;

                    <CategoriesTitlesList 
                        placeId={place.get('_id')} 
                        categories={place.get('categories')} />
                </p>
                <Loader />
			</div>
		);
	}

}

function mapStateToProps(state, ownProps) {

	return {
		isLoading: state.getIn(['places', 'isFetchingPlace']),
		isDeleting: state.getIn(['places', 'isDeletingItem']),
		isDeleted: state.getIn(['places', 'isItemDeleted']),
		placeId: getPlaceIdFromSlug(state, ownProps.params.slug),
		place: state.getIn(['places', 'activeItem']),
        selectedCategoriesFilter: state.getIn(['filters', 'selectedCategoriesFilter']),
        searchFilter: state.getIn(['filters', 'searchFilter'])        
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPlace: (placeId) => dispatch(getPlace(placeId)),
		setActivePlace: (placeId) => dispatch(setActivePlace(placeId)),
		cleanActivePlace: (isForEdit) => dispatch(cleanActivePlace(isForEdit)),
		deletePlace: (placeId) => dispatch(deletePlace(placeId)),
		dispatch: dispatch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceView);