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

    Place.findById(req.params.id, function(err, place){
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
    var place = new Place(req.body);

    Place.findByIdAndUpdate(id, place, { new: true },  function(err, newPlace){
        if (err) {
            return next(err);
        }

        // var category = new Category({
        //     title: categories[0].title,
        //     _creator: place._id
        // });


        // category.save(function (err) {
        //     if (err) {
        //         return next(err);
        //     }
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
