
export function getCategoriesFilterUrl(categoriesFilter) {
	let url = '';

	if (!isCategoriesFilterEmpty(categoriesFilter)) {
		let categoryFilterQuery = getCategoriesFilterQuery(categoriesFilter);
		url += `?categories=${categoryFilterQuery}`;
	}

	return url;
}

function getCategoriesFilterQuery(categoriesFilterArr) {
	return categoriesFilterArr.join(',');
}

export function isCategoryChecked(category, categoriesFilter) {

	let index = categoriesFilter.findIndex(categorySlug => {
		return categorySlug === category.get('slug');
	});

	return index > -1;
}

function isCategoriesFilterEmpty(categoriesFilter) {
	return categoriesFilter.size === 0;
}
