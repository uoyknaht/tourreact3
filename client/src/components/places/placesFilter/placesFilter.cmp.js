import React from 'react';
import { getPlaces } from '../../../actions/placeActions';
import { setCategoriesFilter, setSearchFilter } from '../../../actions/filters.act';
import { getFilterFromQuery } from '../../../services/filters.srv';
import { goToPlaceList } from '../../../services/router.srv';
import { connect }            from 'react-redux';
// import { routeActions } from 'react-router-redux'

class PlaceFilter extends React.Component {

    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this._getNewPropsParams = this._getNewPropsParams.bind(this);
    }

	/**
	 * Method responsible for initial filters state setting according to route when app loads
	 * and initial get of places according to current route query
	 */
	componentDidMount() {
		let query = this.props.routeLocation.query
        let selectedCategoriesFilter = getFilterFromQuery(query.categories);

		this.props.setCategoriesFilter(selectedCategoriesFilter);
        this.props.setSearchFilter(query.search);

		console.log('initial get');
		this.props.getPlaces(this.props.routeLocation.search);
    }

	/**
	 * Method responsible for updating route query when filters state changes
	 * If filter state is the same, but route query changed, then get of places is executed
     * except if new route is of single place view
	 */
    componentWillReceiveProps(newProps) {
		// TODO: places can receive new category, but in place list this wont be reflected

        let changeRoute = () => {
            goToPlaceList(this.props.dispatch, newProps.selectedCategoriesFilter, newProps.searchFilter);
        }

        let getPlaces = () => {
            this.props.getPlaces(newProps.selectedCategoriesFilter, newProps.searchFilter);
        }

		let { hasCategoriesFilterChanged, hasSearchFilterChanged,
		  hasCategoriesQueryChanged, hasSearchQueryChanged } = this._getNewPropsParams(newProps);

		if (hasCategoriesFilterChanged || hasSearchFilterChanged) {
            
            if (newProps.routeParams.id) {
                return;
            }
            
			changeRoute();
		} else if (hasCategoriesQueryChanged || hasSearchQueryChanged) {
			let query = newProps.routeLocation.query
			let selectedCategoriesFilter = getFilterFromQuery(query.categories);

			this.props.setCategoriesFilter(selectedCategoriesFilter);
	        this.props.setSearchFilter(query.search);

			console.log('get on route query change');
			this.props.getPlaces(newProps.routeLocation.search);
		}
    }

	_getNewPropsParams(newProps) {
		return {
			hasCategoriesFilterChanged: hasChanged(this.props.selectedCategoriesFilter, newProps.selectedCategoriesFilter),
	        hasSearchFilterChanged: hasChanged(this.props.searchFilter, newProps.searchFilter),
			hasCategoriesQueryChanged: hasChanged(this.props.routeLocation.query.categories, newProps.routeLocation.query.categories),
	        hasSearchQueryChanged: hasChanged(this.props.routeLocation.query.search, newProps.routeLocation.query.search)
		}
        
        function hasChanged(currentProp, newProp) {
            if (!currentProp && !newProp) {
                return false;
            }
            
            return currentProp !== newProp;
        }
	}

    render() {
        return (
            <div></div>
        );
    }

}

function mapStateToProps(state) {
    return {
        selectedCategoriesFilter: state.getIn(['filters', 'selectedCategoriesFilter']),
        searchFilter: state.getIn(['filters', 'searchFilter'])
    }
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaces: (selectedCategoriesFilter, searchFilter) => dispatch(getPlaces(selectedCategoriesFilter, searchFilter)),
    setCategoriesFilter: (selectedCategoriesFilter) => dispatch(setCategoriesFilter(selectedCategoriesFilter)),
    setSearchFilter: (searchValue) => dispatch(setSearchFilter(searchValue)),
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceFilter);
