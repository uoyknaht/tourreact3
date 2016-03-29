import Immutable from 'immutable';
import find from 'lodash/find'
import filter from 'lodash/filter'
import forEach from 'lodash/forEach'
    
export function getFilteredPlaces(allPlaces, searchFilter, categoriesFilter) {
    let places = allPlaces
    const shouldFilterByCategory = categoriesFilter.length ? true : false;
    const shouldFilterBySearchValue = searchFilter !== undefined && searchFilter !== ''
    let shouldIncludeByCategory = true;
    let shouldIncludeBySearchValue = true;
    if (shouldFilterByCategory || shouldFilterBySearchValue) {
        places = filter(allPlaces, function(place) {
            shouldIncludeByCategory = true;
            shouldIncludeBySearchValue = true;
            if (shouldFilterByCategory) {
                shouldIncludeByCategory = false;
                forEach(place.categories, (category) => {
                    if (categoriesFilter.indexOf(category.slug) > -1) {
                        shouldIncludeByCategory = true;
                        return false;
                    }
                })                
            }
            if (shouldFilterBySearchValue) {
                shouldIncludeBySearchValue = false;
                if (place.title.toLowerCase().indexOf(searchFilter.toLowerCase()) > -1) {
                    shouldIncludeBySearchValue = true;
                }
            }
            return shouldIncludeByCategory && shouldIncludeBySearchValue;
        });        
    }
    return places;
}

export function getPlaceById(places, placeId) {
    return find(places, { _id: placeId });
}

export function getPlaceIdFromSlug(state, slug) {
    if (!slug) {
        return null
    }
    const map = state.getIn(['places', 'placesSlugsIdsMap'])
    if (!map) {
        return null
    }
    // console.log(map.get(slug));
    // if (!map.get(slug)) {
    //     debugger;
    // }
    return map.get(slug)
}

export function getPlacesSlugsIdsMap(places) {
    let map = {};
    places.forEach((place) => {
        map[place.get('slug')] = place.get('_id');
    })
    return Immutable.Map(map);
}