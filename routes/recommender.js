var express = require('express');
var router = express.Router();
var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('morphologicalrecommender', server);

router.get('/', function(req, res, next) {
    if (req.session.loggedIn) {
        res.render('recommender',{data: req.session.userId});
    } else {
        res.render('start');
    }
});

var responseJson =
{
    "status": true
}

// A library to change string to hyphen string
var slugify = require("underscore.string/slugify");
var _ = require("underscore");

router.get('/get-data', function(req, res, next) {

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
            console.log(columnJSON);
            collection.find({}).toArray(function(err, docs) {
                  var k=0;
                  for(i=0;i<result.length;i++){
                    if ((req.session.columns).indexOf(i)!=-1 && result[i]!="_id") {
                      data_id=0;
                      for(var j=0;j<docs.length;j++){
                        //To do: IDs are still assigned manually. Ideally, we want the ID from DB
                        columnJSON[k].column_data.push({value:docs[j][result[i]], id:slugify(result[i])+"-"+data_id, color: "red"});
                        data_id++;
                      }
                      k++;
                    }
                  }

                  //Detect duplicates
                  for (var n=0; n<columnJSON.length; n++){
                  var uniques = columnJSON[n].column_data;

                  var seenValues = {};
                  uniques = uniques.filter(function(currentObject) {
                    if (currentObject.value in seenValues) {
                      return false;
                    } else {
                      seenValues[currentObject.value] = true;
                      return true;
                    }
                  });

                  //Replace (redundant) column_data with uniques. Array size is unchanged
                  var replaceObject = function(a, b) {
                    var prop;

                    for (prop in columnJSON[n].column_data) delete columnJSON[n].column_data[prop];
                      for (prop in uniques) columnJSON[n].column_data[prop] = uniques[prop]; 
                    };
                  replaceObject(columnJSON[n].column_data, uniques);

                  //Remove empty elements from array (resize)
                  function cleanArray(actual) {
                    var cleanArray = new Array();
                    for (var i = 0; i < actual.length; i++) {
                      if (actual[i]) {
                        cleanArray.push(actual[i]);
                      }
                    }
                    return columnJSON[n].column_data = cleanArray;
                  };
                    cleanArray(columnJSON[n].column_data);

                  //console.log(columnJSON[n].column_data);
                }
                  res.setHeader('Content-Type', 'application/json');
                  res.send(JSON.stringify(columnJSON, null, "    "));
                  db.close();
            });
        });
      }
    });

});

module.exports = router;