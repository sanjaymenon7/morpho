var express = require('express');
var router = express.Router();
var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('morphologicalrecommender', server);

// A library to change string to hyphen string
var slugify = require("underscore.string/slugify");

router.get('/get-data', function(req, res, next) {
   if (!req.session.loggedIn || !req.session.tableSet || !req.session.perfSet || !req.session.perfOrderSet) {
    responseJson.status=false;
    res.json(responseJson);
  } else {
    db.open(function(err, db) {
      if(!err) {
        var columnJSON = new Array();
        var data_id;
        var i;
        console.log(req.session.table);
        console.log(req.session.columns);
        var collection = db.collection(req.session.table);
        var query = 'db.'+req.session.table+'_keys.distinct("_id");';
        db.eval(query, function(err, result){
            for(i=0;i<result.length;i++){
              if ((req.session.columns).indexOf(i)!=-1) {
                var header = {column_header:{name:result[i], id:i}, column_data: new Array()};
                columnJSON.push(header);
              }
            }
            //console.log(columnJSON);
            collection.find({}).toArray(function(err, docs) {
                  var k=0;
                  for(i=0;i<result.length;i++){
                    if ((req.session.columns).indexOf(i)!=-1 && result[i]!="_id") {
                      data_id=0;
                      for(var j=0;j<docs.length;j++){
                        columnJSON[k].column_data.push({value:docs[j][result[i]], id:slugify(result[i])+"-"+data_id, color: "red"});
                        data_id++;
                      }
                      k++;
                    }
                  }
                  res.setHeader('Content-Type', 'application/json');
                  res.send(JSON.stringify(columnJSON, null, "    "));
                  db.close();
            });
        });
      }
    });
  }
});

module.exports = router;