var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('./Category');

var PlaceSchema = new Schema({
  // _creator : { type: Schema.Types.ObjectId, ref: 'Category' },
  title: String,
  address: String,
  latitude: {
    type: Number
    // default: 0
  },
  longitude: {
    type: Number
    // default: 0
  },
  createdOn : {
        type : Date,
        default : Date.now
  },
  modifiedOn : {
        type : Date,
        default : Date.now
  },
  // categories : [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  categoriesIds : []
    // comments: [
    //     { 
    //         type: mongoose.Schema.Types.ObjectId, 
    //         ref: 'Comment' 
    //     }
    // ]
});

mongoose.model('Place', PlaceSchema);