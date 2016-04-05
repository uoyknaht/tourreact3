var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Place = mongoose.model('Place');

function addCategoryProperty(req, res, next) {
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    var body = {
        title: 'Interesting places',
        slug: 'interesting-places',
        className: 'interesting-places',
        color: '#ff7f00'
    };

    var category = new Category(body);

    category.save(function(err, savedCategory){
        if (err) {
            return next(err);
        }

        console.log(savedCategory);
        res.json(savedCategory);
    });    

} 

module.exports = addCategoryProperty;