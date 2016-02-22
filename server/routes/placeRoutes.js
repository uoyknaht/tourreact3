var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Place = mongoose.model('Place');

router.get('/api/places', function(req, res, next) {
  Place.find(function(err, places){
    if (err) {
        return next(err);
    }

    res.json(places);
  });
});

// Story.findOne({ title: 'Once upon a timex.' }).populate('_creator').exec(function (err, story) {
//     if (err) return handleError(err);
// })

router.get('/api/places/:id', function(req, res, next) {

    // Place.findById(req.params.id, function(err, place){
    Place.findById(req.params.id)
		.populate('categories')
		.exec(function(err, place) {
	        if (err) {
	            return next(err);
	        }

      // Category.find({ _id: { $in: place.categories}}, function(err, categories){
      //   if (err) {
      //       return next(err);
      //   }

      //   places.categories = categories;

      //   res.json(places);
      // });


        	res.json(place);
    });

});

router.post('/api/places', function(req, res, next) {
    var place = new Place(req.body);

    place.save(function(err, place){
        if (err) {
            return next(err);
        }

        res.json(place);
    });
});

router.post('/api/places/:id/edit', function(req, res, next) {

    var id = req.params.id;
    var placeId = id;
    var place = new Place(req.body);

    Place.findByIdAndUpdate(placeId, place, { new: true }, function (err, newPlace){
        if (err) {
            return next(err);
        }

		// console.log(JSON.stringify(req.body, null, 2))

        // var placeCategories = place.categories;

        // Category.find(function(err, allDbCategories){
        //     if (err) {
        //         return next(err);
        //     }

        //     allDbCategories.forEach(function (category) {
        //        // Category.findOne({ _id: category._id }).exec(function (err, category) {

        //         var options;

        //         if (placeCategories.indexOf(category._id) > -1) {
        //             if (category.places.indexOf(placeId) < 0) {
        //                 options = { $push : { places: id }};
        //             }                        
        //         } else {
        //             if (category.places.indexOf(placeId) > -1) {
        //                 options = { $pulAll : { places: [id] }};
        //             }  
        //         }

        //         if (options) {
        //             Category.update(
        //                 { _id: category._id },
        //                 options,
        //                 function (err) {
        //                     if (err) {
        //                         return next(err);
        //                     }
        //                 }
        //                 );                        
        //         }

        //     });


        // });

         res.json(newPlace);
    });
});

router.delete('/api/places/:id', function(req, res, next) {

    Place.remove({ _id: req.params.id }, function (err) {
        if (err) {
            return next(err);
        }
        res.send();
    });


    // Place.findById(req.params.id, function(err, place){
    //     if (err) {
    //         return next(err);
    //     }



    // });



    // // var id = req.params.id;
    // // var place = new Place(req.body);





    // Place.findByIdAndUpdate(id, { $set: place },  function(err, place){
    //     if (err) {
    //         return next(err);
    //     }

    //     res.json(place);
    // });
});

// router.put('/places', function(req, res, next) {
//     saveOrUpdate(req, res, next);
// });

// function saveOrUpdate(req, res, next) {
//     var place = new Place(req.body);

//     Place.findOneAndUpdate({_id: place._id}, place, {upsert: true}, function(err, place){
//         if (err) {
//             return next(err);
//         }

//         res.json(place);
//     });
// }

// router.put('/places', function(req, res, next) {
//   var place = new Place(req.body);

//   place.findOneAndUpdate({_id: place._id}, place, {upsert: true}, (function(err, place){
//     if (err) {
//         return next(err);
//     }

//     res.json(place);
//   });
// });


// function addCategories() {

//     var categories = [
//         {
//             title: 'Panoramos'
//         },
//         {
//             title: 'Piliakalniai'
//         },
//         {
//             title: 'Paplūdimiai'
//         },
//         {
//             title: 'Pilys'
//         }
//     ];

//     for (var i = 0; i < categories.length; i++) {
//         var cat = categories[i];
//         var category = new Category(category);
//         category.save(function(err){
//             if (err) {
//                 console.log(err);
//             }
//         });
//     }

// }


router.get('/api/categories', function(req, res, next) {
  Category.find(function(err, categories){
    if (err) {
        return next(err);
    }

    res.json(categories);
  });

  // Category.find().populate('places').exec(function(err, categories){
  //   if (err) {
  //       return next(err);
  //   }

  //   res.json(categories);
  // });

});

module.exports = router;
