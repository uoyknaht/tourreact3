import Immutable from 'immutable';
import notifierService from '../services/notifier.srv';

let defaultState = Immutable.Map({
    isLoading: false,
    isFetchingCategories: false,
    areCategoriesFetched: false,
    categories: Immutable.List()
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

        case 'REQUEST_GET_CATEGORIES':
            state = state.set('isLoading', true);
            state = state.set('isFetchingCategories', true);
            return state;

        case 'RESPONSE_GET_CATEGORIES':
            state = state.set('isLoading', false);
            state = state.set('isFetchingCategories', false);
            state = state.set('areCategoriesFetched', true);
            state = state.set('categories', Immutable.fromJS(action.categories));
            return state;

        case 'RESPONSE_GET_CATEGORIES_ERROR':
            notifierService.error('error RESPONSE_GET_CATEGORIES_ERROR');
            state = state.set('isLoading', false);
            state = state.set('isFetchingCategories', false);
            return state;

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

        default:
            return state;
    }

}
