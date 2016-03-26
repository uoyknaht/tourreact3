var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Place = mongoose.model('Place');

function addCategoryProperty(req, res, next) {
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    var body = {
        title: 'Parks',
        slug: 'parks',
        className: '#00e000',
        color: 'red'
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