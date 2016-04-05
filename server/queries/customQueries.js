var addCategory = require('./addCategory');
var updateCategoryProperty = require('./updateCategory');

function doCustomQueries(req, res, next) {
    // console.log('------------------------')
    // addCategory(req, res, next);
    
    // updateCategoryProperty(req, res, next, 'slug', 'parks', 'className', 'parks');
    // updateCategoryProperty(req, res, next, 'slug', 'parks', 'color', '#7fff00');
    // updateCategoryProperty(req, res, next, 'title', 'Beaches', 'slug', 'beaches');

    // updateCategoryProperty('className', 'castle', 'color', '#7f0000');
    // updateCategoryProperty('className', 'beach', 'color', '#086ad3');       
}

module.exports = doCustomQueries;