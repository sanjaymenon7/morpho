var express = require('express');
var router = express.Router();
var phoneInfo = require('../data/phoneData')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: 'Express',data: phoneInfo.phoneSpecs });
 // res.json(phoneInfo.phoneSpecs)
 //res.send(phoneInfo.phoneSpecs[0].CompanyName);
 //console.log(phoneInfo.phoneSpecs[0]);
});

router.get('/mainData',function(req,res,next){
  res.json(phoneInfo.phoneSpecs)
})

module.exports = router;

