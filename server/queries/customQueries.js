var addCategory = require('./addCategory');
var updateCategoryProperty = require('./updateCategory');

function doCustomQueries(req, res, next) {
    // console.log('------------------------')
    // addCategory(req, res, next);
    
    // updateCategoryProperty(req, res, next, 'slug', 'castles', 'title', 'Castles');
    // updateCategoryProperty(req, res, next, 'title', 'Beaches', 'slug', 'beaches');

    // updateCategoryProperty('className', 'castle', 'color', '#7f0000');
    // updateCategoryProperty('className', 'beach', 'color', '#086ad3');       
}

module.exports = doCustomQueries;