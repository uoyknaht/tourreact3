var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Place = mongoose.model('Place');

function updateCategoryProperty(req, res, next, queryProperty, queryValue, updateProperty, updateValue) {
    updateCategoryItself();
    updateEmbededCategories();
    
    function updateCategoryItself() {
        var query = {};
        query[queryProperty] = queryValue;
        var update = {
            $set: {}
        };
        update.$set[updateProperty] = updateValue;
        Category.update(
            query, 
            update,
            { upsert: true }, 
            function(err, category){
                if (err) {
                    return next(err);
                }
            });      
    }
    
    function updateEmbededCategories() {
        Category
            .find({})
            .exec(function(err, categories){
                if (err) {
                    return next(err);
                }
                categories.forEach(function (category) {   
                    var query = {
                        categories: {
                            $elemMatch: {}
                        }
                    };
                    query.categories.$elemMatch[queryProperty] = {
                        $in: [category[queryProperty]]
                    };
                    Place
                        .find(query)
                        .exec(function(err, places){
                            if (err) {
                                return next(err);
                            }
                            places.forEach(function (place) {
                                var index;
                                place.categories.forEach(function (cat, i) {
                                    if (cat[queryProperty] === category[queryProperty]) {
                                        index = i;
                                    }
                                });
                                
                                place.categories[index] = category;
                                
                                var place222 = new Place(place);

                                Place.findByIdAndUpdate(place._id, place222, function (err, newPlace) {
                                    if (err) {
                                        return next(err);
                                    }
                                    console.log('done')
                                });                        
                            })
                    });             
                })
        });         
    }
} 

module.exports = updateCategoryProperty;