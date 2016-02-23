import Immutable from 'immutable';
import notifierService from '../services/notifier.srv';

let defaultState = Immutable.Map({
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

            return state.set('isFetchingCategories', true);

        case 'RESPONSE_GET_CATEGORIES':

            newState = state.set('isFetchingCategories', false);
            newState = newState.set('areCategoriesFetched', true);
            newState = newState.set('categories', Immutable.fromJS(action.categories));

            return newState;

        case 'RESPONSE_GET_CATEGORIES_ERROR':

            notifierService.error('error RESPONSE_GET_CATEGORIES_ERROR');

            return state.set('isFetchingCategories', false);

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

        default:
            return state;
    }

}
