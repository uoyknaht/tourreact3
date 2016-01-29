var restify = require('restify');
var server = restify.createServer();
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var appConstants = require('../appConstants');

require('./db');

var Place = mongoose.model('Place');
var Category = mongoose.model('Category');

server.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', 'http://localhost:' + appConstants.urls.webrootPort);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  return next();
});

server.listen(appConstants.urls.apiPort, function() {
  console.log('%s listening at %s', server.name, server.url);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

server.get('/api/places', function (req, res, next) {

  Place.find(function(err, places){
    if (err) {
        return next(err);
    }
    console.log(places);
    res.json(places);
  });

  next();
});
