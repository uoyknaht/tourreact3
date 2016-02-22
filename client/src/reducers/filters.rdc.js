import Immutable from 'immutable';

let defaultState = Immutable.Map({
    selectedCategoriesFilter: Immutable.List(),
    searchFilter: ''
});

export default function categoriesReducer(state = defaultState, action) {

    let newState;
    let categories;
    let index;
    let slugs;

    switch(action.type) {

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

        case 'SET_CATEGORIES_FILTER':

            return state.set('selectedCategoriesFilter', Immutable.List(action.filter));

        case 'CHANGE_CATEGORIES_FILTER':

            slugs = state.get('selectedCategoriesFilter');

            index = slugs.findIndex(categorySlug => {
                return categorySlug === action.categorySlug;
            });

            if (index > -1) {
                slugs = slugs.remove(index);

                return state.set('selectedCategoriesFilter', slugs);
            }

            return state.update('selectedCategoriesFilter', slugs => slugs.push(action.categorySlug));

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

        case 'SET_SEARCH_FILTER':

            return state.set('searchFilter', action.searchValue);

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

        default:
            return state;
    }

}
