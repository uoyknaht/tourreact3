import apiService from '../services/api.srv'

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export function getCategories() {
  return function (dispatch, getState) {
    if (!shouldGetCategories(getState())) {
      return;
    }

    dispatch(requestGetCategories());

    return apiService.get('http://localhost:8081/api/categories')
        .then(json => dispatch(responseGetCategories(json)))
        .catch((error) => {
            console.log(error);
            dispatch(responseGetCategoriesError(error))
        });
  }
}

function requestGetCategories() {
  return {
    type: 'REQUEST_GET_CATEGORIES'
  }
}

function responseGetCategories(categories) {
  return {
    type: 'RESPONSE_GET_CATEGORIES',
    categories
  }
}

function responseGetCategoriesError(error) {
  return {
    type: 'RESPONSE_GET_CATEGORIES_ERROR',
    error
  }
}

function shouldGetCategories(state) {
  if (state.getIn(['categories', 'isFetchingItems'])) {
    return false;
  }

  if (state.getIn(['categories', 'areItemsFetched'])) {
    return false;
  }

  return true;
}