import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { bindActionCreators } from 'redux';
import { getPlaces } from '../../../actions/placeActions';
import { setCategoriesFilter } from '../../../actions/category.act';
import { getFilterFromQuery } from '../../../services/categories.srv';
import { connect }            from 'react-redux';
// import { routeActions } from 'react-router-redux'
import Loader from '../../loader/loader.cmp';
import CategoryList from '../../categories/categoryList/categoryList.cmp';

//@connect(state => ({ places: state.places }))
class PlaceList extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
		if (this.props.categoriesQuery) {
			let selectedCategoriesFilter = getFilterFromQuery(this.props.categoriesQuery);
			this.props.setCategoriesFilter(selectedCategoriesFilter);
		}
    }

    componentDidMount() {
		this.props.getPlaces(this.props.selectedCategoriesFilter);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.selectedCategoriesFilter
            && this.props.selectedCategoriesFilter !== newProps.selectedCategoriesFilter) {

            this.props.getPlaces(newProps.selectedCategoriesFilter);
        }
    }

    render() {
      let places = this.props.places;

      if (!places) {
        return (
          <Loader />
        );
      }

      if (!places.size) {
        return (
          <div>No places</div>
        );
      }

      var placesHtml = [];

      places.forEach((place) => {
        placesHtml.push(
          <Link to={`/places/${place.get('_id')}`} className="list-group-item" key={place.get('_id')}>
            <h4 className="list-group-item-heading">{place.get('title')}</h4>
            <p className="list-group-item-text">...</p>
          </Link>
        );
      });

        return (
          <div>
            <Link to={`/places/actions/create`}>Create new</Link>
            <br/>
            <CategoryList />
            <br/>
              <div className="list-group">
                {placesHtml}
              </div>
          </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
	return {
	    places: state.getIn(['places', 'places']),
		categoriesQuery: ownProps.location.query.categories
	}
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaces: (selectedCategoriesFilter) => dispatch(getPlaces(selectedCategoriesFilter)),
    setCategoriesFilter: (selectedCategoriesFilter) => dispatch(setCategoriesFilter(selectedCategoriesFilter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);
