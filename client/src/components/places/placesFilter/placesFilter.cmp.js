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
        // this.componentDidMount = this.componentDidMount.bind(this);
        // this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {

    }

    // componentDidMount() {  
    //     let doesFilterExist = false;

    //     if (this.props.categoriesQuery) {
    //         let selectedCategoriesFilter = getFilterFromQuery(this.props.categoriesQuery);
    //         this.props.setCategoriesFilter(selectedCategoriesFilter);
    //         doesFilterExist = true;
    //     }

    //     if (this.props.searchQuery) {
    //         this.props.setSearchFilter(this.props.searchQuery);
    //         doesFilterExist = true;
    //     }


    //     console.log(this.props.searchFilter);
    //     if (!doesFilterExist) {
    //         console.log(555);
    //         this.props.getPlaces();
    //     }    

    // }

    // componentWillReceiveProps(newProps) {
    //     if (newProps.selectedCategoriesFilter
    //         && this.props.selectedCategoriesFilter !== newProps.selectedCategoriesFilter) {

    //      let categoriesFilterUrlPart = getCategoriesFilterUrl(newProps.selectedCategoriesFilter)
    //      let fullUrl = `/places${categoriesFilterUrlPart}`;

    //      this.props.dispatch(routeActions.push(fullUrl));
    //     }
    // }    
  

    componentWillReceiveProps(newProps) {
        let chageRoute = () => {
            goToPlaceList(this.props.dispatch, newProps.selectedCategoriesFilter, newProps.searchFilter);
        }

        // TODO: places can receive new category, but in place list this wont be reflected

        // debugger;

        let hasCategoriesFilterChanged = newProps.selectedCategoriesFilter
            && this.props.selectedCategoriesFilter !== newProps.selectedCategoriesFilter;

        let hasSearchFilterChanged = newProps.searchFilter
            && this.props.searchFilter !== newProps.searchFilter;

        if (hasCategoriesFilterChanged && hasSearchFilterChanged) {
            chageRoute();
            this.props.getPlaces(newProps.selectedCategoriesFilter, newProps.searchFilter);
        }
        else if (hasCategoriesFilterChanged) {
            chageRoute();
            this.props.getPlaces(newProps.selectedCategoriesFilter);
        } 
        else if (hasSearchFilterChanged) {
            chageRoute();
            this.props.getPlaces(null, newProps.searchFilter);
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
