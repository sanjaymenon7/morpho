var express = require('express');
var router = express.Router();

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
  var file = './data/'+req.query.filename;
  res.download(file);
});

module.exports = router;