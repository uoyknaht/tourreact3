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
            }
            

            
            return shouldIncludeByCategory && shouldIncludeBySearchValue;
            
        });        
    }
    
    if (searchFilter) {
        
    }
     

    
    return places;
}

var a = {  
        // return _.contains(values, place[property]);
    "_id":"56cb00fe84d630a011040d68",
    "title":"Eigulių piliakalnis",
    "address":"Dusetų g. 13, Kaunas 50168, Lithuania",
    "latitude":54.917133588706,
    "longitude":23.914884376525833,
    "__v":0,
    "isAddressApproximate":true,
    "categories":[  
        {  
            "__v":0,
            "color":"#7f3f00",
            "className":"mound",
            "slug":"piliakalniai",
            "title":"Piliakalniai",
            "_id":"54cd21a40a50ee7c03dedae3"
        }
    ],
    "modifiedOn":"2016-03-20T14:23:50.488Z",
    "createdOn":"2016-03-20T14:23:50.488Z"
}