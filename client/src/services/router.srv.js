import { routeActions } from 'react-router-redux';
import { getCategoriesFilterUrl } from './categories.srv'

export function goToPlaceView(dispatch, placeId) {
    dispatch(routeActions.push(`/places/${placeId}`));
}

export function getPlaceListUrl(categoriesFilter, searchFilter) {

    let url = 'http://localhost:8081/api/places';
    let categoriesFilterUrl = getCategoriesFilterUrl(categoriesFilter);

    return apiService.get(`http://localhost:8081/api/places${categoriesFilterUrl}`)

}