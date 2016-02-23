import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { bindActionCreators } from 'redux';
import { getPlaces } from '../../../actions/placeActions';
import { setCategoriesFilter, setSearchFilter } from '../../../actions/filters.act';
import { getFilterFromQuery } from '../../../services/filters.srv';
import { connect }            from 'react-redux';
// import { routeActions } from 'react-router-redux'
import Loader from '../../loader/loader.cmp';
import CategoryList from '../../categories/categoryList/categoryList.cmp';
import CategoriesTitlesList from '../../categories/categoriesTitlesList/categoriesTitlesList.cmp.js'
import PlacesFilter from '../placesFilter/placesFilter.cmp'
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

    }

    componentDidMount() {  
        let doesFilterExist = false;

        if (this.props.categoriesQuery) {
            let selectedCategoriesFilter = getFilterFromQuery(this.props.categoriesQuery);
            this.props.setCategoriesFilter(selectedCategoriesFilter);
            doesFilterExist = true;
        }

        if (this.props.searchQuery) {
            this.props.setSearchFilter(this.props.searchQuery);
            doesFilterExist = true;
        }


        console.log(this.props.searchFilter);
        if (!doesFilterExist) {
            console.log(555);
            this.props.getPlaces();
        }		
    }

    componentWillReceiveProps(newProps) {
        // TODO: places can receive new category, but in place list this wont be reflected

        let hasCategoriesFilterChanged = newProps.selectedCategoriesFilter
            && this.props.selectedCategoriesFilter !== newProps.selectedCategoriesFilter;

        let hasSearchFilterChanged = newProps.searchFilter
            && this.props.searchFilter !== newProps.searchFilter;

        if (hasCategoriesFilterChanged && hasSearchFilterChanged) {

            this.props.getPlaces(newProps.selectedCategoriesFilter, newProps.searchFilter);
        }
        else if (hasCategoriesFilterChanged) {
            this.props.getPlaces(newProps.selectedCategoriesFilter);
        } else if (hasSearchFilterChanged) {
            console.log(newProps.searchFilter);
            this.props.getPlaces(null, newProps.searchFilter);
        }
    }

    render() {
        let places = this.props.places;
        let filterCmp = (
            <PlacesFilter query={this.props.query} />
        );

        if (!places) {
            return (
                <div>
                    {filterCmp}
                    <Loader />
                </div>
            );
        }

        if (!places.size) {
            return (
                <div>
                    {filterCmp}
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
                {filterCmp}
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
        query: ownProps.location.query,
        categoriesQuery: ownProps.location.query.categories,
		searchQuery: ownProps.location.query.search,
        selectedCategoriesFilter: state.getIn(['filters', 'selectedCategoriesFilter']),
        searchFilter: state.getIn(['filters', 'searchFilter'])
	}
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaces: (selectedCategoriesFilter, searchFilter) => dispatch(getPlaces(selectedCategoriesFilter, searchFilter)),
    setCategoriesFilter: (selectedCategoriesFilter) => dispatch(setCategoriesFilter(selectedCategoriesFilter)),
    setSearchFilter: (searchValue) => dispatch(setSearchFilter(searchValue))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);
