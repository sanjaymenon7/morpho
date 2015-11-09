var express = require('express');
var router = express.Router();
var phoneInfo = require('../data/phoneData')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: 'Express',data: phoneInfo.phoneSpecs });
 //res.send(phoneInfo.phoneSpecs[0].CompanyName);
 //console.log(phoneInfo.phoneSpecs[0]);
});

module.exports = router;

