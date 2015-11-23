var express = require('express');
var router = express.Router();
var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('morphologicalrecommender', server);

// Multer - A lib to manage uploads
var multer  = require('multer');

/* GET all users in collection "Users" */
router.get('/showallusers', function(req, res, next) {
	db.open(function(err, db) {
	res.send(db.users.find());
  });
	db.close();
});

module.exports = router;
