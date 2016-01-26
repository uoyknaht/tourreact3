var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('./Place');

var CategorySchema = new Schema({
    // _creator : { type: String, ref: 'Place' },
    title: String,
    // places: [{ type: String, ref: 'Place' }]
    // places : [{ type: Schema.Types.ObjectId, ref: 'Place' }]
});

mongoose.model('Category', CategorySchema);