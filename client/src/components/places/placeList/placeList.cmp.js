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
import CategoriesTitlesList from '../../categories/categoriesTitlesList/categoriesTitlesList.cmp.js'
import PlacesSearch from '../placesSearch/placesSearch.cmp'

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
		} else {
            this.props.getPlaces();
        }
    }

    componentDidMount() {  
		
    }

    componentWillReceiveProps(newProps) {
        // TODO: places can receive new category, but in place list this wont be reflected
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
            <div>
                <CategoryList />
                <br/>
                <div className="alert alert-info" role="alert">No places found</div>
            </div>
        );
      }

      var placesHtml = [];

      places.forEach((place) => {
        placesHtml.push(
          <div to className="list-group-item" key={place.get('_id')}>

            <Link 
                to={`/places/${place.get('_id')}`} 
                className="list-group-item-heading">

                {place.get('title')}
            </Link>

            <p className="list-group-item-text">
                Categories:&nbsp;
                <CategoriesTitlesList 
                    placeId={place.get('_id')} 
                    categories={place.get('categories')} />
            </p>
          </div>
        );
      });

        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to={`/places/actions/create`}>Create new</Link>
                        <br/> 
                    </div>
                    <div className="col-md-6">
                        <PlacesSearch />
                    </div>
                </div>

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
		categoriesQuery: ownProps.location.query.categories,
        selectedCategoriesFilter: state.getIn(['categories', 'selectedCategoriesFilter'])
	}
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaces: (selectedCategoriesFilter) => dispatch(getPlaces(selectedCategoriesFilter)),
    setCategoriesFilter: (selectedCategoriesFilter) => dispatch(setCategoriesFilter(selectedCategoriesFilter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);
