var express = require('express');
var router = express.Router();
var configVariables= require('../configVariables');
var json2csv = require('json2csv');
var fs = require('fs');

var responseJson =
{
    "status": true
}

/*router.get('/', function(req, res, next) {
  if (!req.session.loggedIn || !req.session.tableSet || !req.session.perfSet || !req.session.perfOrderSet) {
    responseJson.status=false;
    res.json(responseJson);
  } else {
    
  }
});*/

router.get('/', function(req, res){
  var file = configVariables.configLines.uploadDestination+req.query.filename;
  res.download(file);
});

router.get('/csvFile', function(req, res){
    var json = require(configVariables.configLines.uploadDestination+req.query.filename);
    var fields = req.session.selectedCols;
    json2csv({ data: json, fields: fields }, function(err, csv) {
        if (err) console.log(err);
        fs.writeFile(configVariables.configLines.uploadDestination+req.query.filename+'.csv', csv, function(err) {
            if (err) throw err;
            var file = configVariables.configLines.uploadDestination+req.query.filename+".csv";
            res.download(file);
        });
        
    });
});

module.exports = router;