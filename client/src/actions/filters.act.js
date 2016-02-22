// import apiService from '../services/api.srv'

export function setCategoriesFilter(filter) {
    return {
        type: 'SET_CATEGORIES_FILTER',
        filter
    }
}

export function changeCategoriesFilter(categorySlug) {
    return {
        type: 'CHANGE_CATEGORIES_FILTER',
        categorySlug
    }
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function setSearchFilter(searchValue) {
    return {
        type: 'SET_SEARCH_FILTER',
        searchValue
    }
}