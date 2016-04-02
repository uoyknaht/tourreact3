import { routeActions } from 'react-router-redux';
import { getPlaceListFilterQuery } from './filters.srv'

export function goToPlaceView(dispatch, placeSlug) {
    dispatch(routeActions.push(`/places/${placeSlug}`));
}

export function goToPlaceList(dispatch, categoriesFilter, searchFilter) {
    let filterQuery = getPlaceListFilterQuery(categoriesFilter, searchFilter);
    dispatch(routeActions.push(`/${filterQuery}`));
}
