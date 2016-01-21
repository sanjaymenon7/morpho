/**
 * Created by kaushik on 27.11.15.
 * for ordering the column values based on input from user.
 * The user will order the values in the performance column.
 */

var express = require('express');
var router = express.Router();
var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('morphologicalrecommender', server);
// use the performance column value from session variable.
//
var responseJson =
{
    "status": true
}

/* GET */
router.get('/', function(req, res, next) {
    if (!req.session.loggedIn) {
        res.render("start");
      } else if (!req.session.tableSet) {
        res.render("datasourceselection",{data: req.session.userId});
      } else if(!req.session.perfSet){
        res.render('coloumnpreprocessor',{data: req.session.userId});
      } else {
        res.render('column_values_dragdrop',{data: req.session.userId});

      }
});

router.get('/column_values_dragdrop_post',function(req,res,next){
     if (!req.session.loggedIn || !req.session.tableSet || !req.session.perfSet) {
        responseJson.status=false;
        res.json(responseJson);
     } else {
      db.open(function(err, db) {
        if(!err) {
          var colFound = 0;
          var collection = db.collection(req.session.table);
          var collection_keys = db.collection(req.session.table+"_keys");
          collection.findOne({}, function(err, doc) {
            var query = 'db.'+req.session.table+'_keys.distinct("_id");';
            db.eval(query, function(err, result){
                for(i=0;i<result.length;i++){
                    if (req.session.performance==i) {
                      colFound = 1;
                      if (doc.hasOwnProperty(result[i]) && typeof doc[result[i]] === "number") {
                        var column = {columnName: result[i], dataType: "numeric", values: new Array()};
                        var minOptions = {
                            "limit": 1,
                            "sort": [[[result[i]],'asc']]
                        };
                        var maxOptions = {
                            "limit": 1,
                            "sort": [[[result[i]],'desc']]
                        };
                        collection.find({}, minOptions).toArray(function(err1, result1){
                            var value = {value: result1[0][column.columnName], acv: 1};
                            (column.values).push(value);
                            collection.find({}, maxOptions).toArray(function(err2, result2){
                              var value = {value: result2[0][column.columnName], acv: 1};
                              (column.values).push(value);
                              db.close();
                              res.json(column);
                            });
                        });
                      }
                      if (doc.hasOwnProperty(result[i]) && typeof doc[result[i]] !== "number") {
                        var column = {columnName: result[i], dataType: "ordinal", values: new Array()};
                        collection.distinct(column.columnName, function(err3, docs3) {
                            var acv = parseInt(docs3.length/2);
                            for(var j=0;j<docs3.length;j++){
                                var value = {value: docs3[j], acv: acv};
                                (column.values).push(value);
                            }
                            db.close();
                            res.json(column);
                        });
                        
                      }
                    } 
                }
                if (!colFound) {
                    responseJson.status=false;
                    res.json(responseJson);
                }
            });
          });
        }
      });
    }
});

router.post('/column_values_dragdrop_result',function(req,res,next){
    if (!req.session.loggedIn || !req.session.tableSet || !req.session.perfSet) {
        responseJson.status=false;
        res.json(responseJson);
     } else {
        router.sess = req.session;
        router.sess.perfOrderSet = true;
        (req.body.values).sort(function(a, b) {
            return parseInt(a.acv) - parseInt(b.acv);
        });
        responseJson.status=true;
        router.sess.perfCol=req.body;
        res.json(responseJson);                
     }
});

module.exports = router;

