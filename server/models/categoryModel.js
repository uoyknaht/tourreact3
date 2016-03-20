var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlaceSchema = require('./placeModel');

var CategorySchema = new Schema({
    title: String,
    slug: String,
    className: String,
    color: String
});

module.exports = mongoose.model('Category', CategorySchema);