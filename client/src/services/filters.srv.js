import { getCategoriesFilterUrl } from './categories.srv'

export function getPlaceListFilterQuery(categoriesFilter, searchFilter) {

    let query = '';
    let categoriesFilterUrl = getCategoriesFilterUrl(categoriesFilter);

    if (categoriesFilterUrl && categoriesFilterUrl.charAt(0) === '?') {
        categoriesFilterUrl = categoriesFilterUrl.substr(1);
    }

    if (categoriesFilter) {
        query += 'categories=' + categoriesFilter;
    }

    if (searchFilter) {
        if (categoriesFilter) {
            query += '&';
        }

        query += 'search=' + searchFilter;
    }

    if (query) {
        query = '?' + query;    
    }

    return query;

}