
export function getCategoriesFilterUrl(categoriesFilter) {
	let url = '';

    if (!categoriesFilter) {
        return url;
    }

	if (!isCategoriesFilterEmpty(categoriesFilter)) {
		let categoryFilterQuery = getQueryFromFilter(categoriesFilter);
		url += `?categories=${categoryFilterQuery}`;
	}

	return url;
}

export function isCategoryChecked(category, categoriesFilter) {

	let index = categoriesFilter.findIndex(categorySlug => {
		return categorySlug === category.get('slug');
	});

	return index > -1;
}

export function getFilterFromQuery(query) {
	return query.split(',');
}

function getQueryFromFilter(categoriesFilter) {
	return categoriesFilter.toJS().join(',');
}

function isCategoriesFilterEmpty(categoriesFilter) {
	return categoriesFilter.size === 0;
}
