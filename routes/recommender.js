var express = require('express');
var router = express.Router();
var configVariables= require('../configVariables');
var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('morphologicalrecommender', server);

// FS Module to save json data
var fs = require("fs");

// Crypo module to generate file name from userId
var crypto = require('crypto');

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
       var data = {
        columnData: new Array(),
        groupData: req.session.perfCol
       };
       //var columnJSON = new Array();
       var collection = db.collection(req.session.table+"_keys");
       collection.find().toArray(function(err, docs) {
           var k=0;
           for (var col=0; col<docs.length; col++){
              if (docs[col]._id!="_id" && (req.session.selectedCols).indexOf(docs[col]._id)!=-1){
                var header = {column_header:{name:docs[col]._id, id:col}, column_data: new Array()};
                if (typeof docs[col].value[0].value === "number") {
                    header.column_header.type="number";
                } else {
                    header.column_header.type="ordinal";
                }
                data.columnData.push(header);
                for (var val=0; val<(docs[col].value).length; val++){
                  (data.columnData[k].column_data).push({value:docs[col].value[val].value, id:docs[col].value[val].id});
                }
                k++;
              }
            }
            collection = db.collection(req.session.table);
            collection.find().toArray(function(err, docs2) {
                data.configData = docs2;
                res.json(data);
                db.close();
            });
           });
     }
   });
});

router.get('/get-all-data', function(req, res, next) {
    db.open(function(err, db) {
     if(!err) {
       var collection = db.collection(req.session.table);
       collection.find().toArray(function(err, docs) {
        if (req.session.perfCol.dataType=="ordinal") {
            for(var j=0;j<(req.session.perfCol.values).length;j++){
                for(var k=0;k<docs.length;k++){
                    if (docs[k][req.session.perfCol.columnName]==req.session.perfCol.values[j].value) {
                        docs[k][req.session.perfCol.columnName]=req.session.perfCol.values[j].label;
                    }
                }
            }
        } else {
            for(var j=0;j<(req.session.perfCol.values).length;j++){
                for(var k=0;k<docs.length;k++){
                    if (docs[k][req.session.perfCol.columnName]>=req.session.perfCol.values[j].minVal && docs[k][req.session.perfCol.columnName]<=req.session.perfCol.values[j].maxVal) {
                        docs[k][req.session.perfCol.columnName]=req.session.perfCol.values[j].label
                    }
                }
            }
        }
        res.json(docs);
       });    
     }
   });
});

router.get('/get-parallel-coords-column-metadata', function(req, res, next) {
    db.open(function(err, db) {
        if(!err) {
          var collection = db.collection(req.session.table);
          var collection_keys = db.collection(req.session.table+"_keys");
          var column_info = {
            "dimensions": new Array(),
            "types": {},
            "color":new Array()
          }
          collection.findOne({}, function(err, doc) {
            var query = 'db.'+req.session.table+'_keys.distinct("_id");';
            db.eval(query, function(err, result){
                for(var i=0;i<result.length;i++){
                    if(result[i]!="_id"){
                        if (doc.hasOwnProperty(result[i]) && typeof doc[result[i]] === "number") {
                            column_info.types[result[i]] = "number";
                        } else {
                            column_info.types[result[i]] = "string";
                        }
                        if (i==req.session.performance){
                            column_info.types[result[i]] = "string";
                            column_info.dimensions.push(result[i]);
                        }
                    }
                }
                for(var i=0;i<result.length;i++){
                    if (result[i]!="_id" && i!=req.session.performance && req.session.selectedCols.indexOf(result[i])!=-1)
                        column_info.dimensions.push(result[i]);
                };
                res.json(column_info);
            });
          });
        }
    });
});

router.post('/prepareJson', function(req, res, next) {
    db.open(function(err, db) {
      if(!err) {
        var collection_keys = db.collection(req.session.table+"_keys");
        var selected_items = req.body.selected_items;
        var condition = {};
        var counter = -1;
        selected_items.forEach(function(item, index){
            collection_keys.find({"value.id":item}).toArray(function(err, docs){
                var item_index = 0;
                for(var i=0;i<docs[0].value.length;i++){
                    if(docs[0].value[i].id==item){
                        item_index = i;
                        break;
                    }
                }
                if (condition[docs[0]._id] != undefined) {
                    if (condition[docs[0]._id]['$in'] != undefined) {
                        (condition[docs[0]._id]['$in']).push(docs[0].value[item_index].value);
                    } else {
                        var temp = condition[docs[0]._id];
                        condition[docs[0]._id] = {"$in": new Array()};
                        condition[docs[0]._id]["$in"].push(temp);
                        (condition[docs[0]._id]['$in']).push(docs[0].value[item_index].value);
                    }
                } else {
                    condition[docs[0]._id] = docs[0].value[item_index].value;
                }
                counter++;
                if (counter == selected_items.length-1) {
                    
                    var collection = db.collection(req.session.table);
                    
                    collection.find(condition).toArray(function(err2,docs2){
                        var jsonFile=docs2;
                        if (req.session.perfCol.dataType=="ordinal") {
                            var modifiedJson = new Array();
                            for(var j=0;j<(req.session.perfCol.values).length;j++){
                                for(var k=0;k<docs2.length;k++){
                                    if (docs2[k][req.session.perfCol.columnName]==req.session.perfCol.values[j].value) {
                                        docs2[k][req.session.perfCol.columnName]=req.session.perfCol.values[j].label
                                        modifiedJson.push(docs2[k]);
                                    }
                                }
                            }
                            jsonFile = modifiedJson;
                        } else {
                            var modifiedJson = new Array();
                            for(var j=0;j<(req.session.perfCol.values).length;j++){
                                for(var k=0;k<docs2.length;k++){
                                    if (docs2[k][req.session.perfCol.columnName]>=req.session.perfCol.values[j].minVal && docs2[k][req.session.perfCol.columnName]<=req.session.perfCol.values[j].maxVal) {
                                        docs2[k][req.session.perfCol.columnName]=req.session.perfCol.values[j].label
                                        modifiedJson.push(docs2[k]);
                                    }
                                }
                            }
                            jsonFile = modifiedJson;
                            
                        }
                        var hash = crypto.createHash('md5').update(req.session.userId).digest('hex');
                        fs.writeFile(configVariables.configLines.uploadDestination+hash+".json", JSON.stringify(jsonFile), "utf8",function(err3,res4){
                            var resJson = {
                                success: true,
                                filename: hash+".json",
                                columns: req.session.selectedCols
                            }
                            res.json(resJson);
                        });
                    });
                }
            }); 
        });
      }
    });
});

module.exports = router;