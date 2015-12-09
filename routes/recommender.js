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
       var columnJSON = new Array();
       var collection = db.collection(req.session.table+"_keys");
       collection.find().toArray(function(err, docs) {
           //console.log(docs);
           var k=0;
           for (var col=0; col<docs.length; col++){
              if (docs[col]._id!="_id" && (req.session.columns).indexOf(col)!=-1){
                var header = {column_header:{name:docs[col]._id, id:col}, column_data: new Array()};
                columnJSON.push(header);
                for (var val=0; val<(docs[col].value).length; val++){
                  (columnJSON[k].column_data).push({value:docs[col].value[val].value, id:docs[col].value[val].id});
                  
                }
                k++;
              }
            }
            res.json(columnJSON);
            db.close();
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
        selected_items.forEach(function(item, index){
            collection_keys.find({"value.id":item}).toArray(function(err, docs){
                var item_index = 0;
                for(var i=0;i<docs[0].value.length;i++){
                    if(docs[0].value[i].id==item){
                        item_index = i;
                        break;
                    }
                }
                condition[docs[0]._id] = docs[0].value[item_index].value;
                if (index == selected_items.length-1) {
                    var sort = {};
                    if (req.session.perfColType=="numeric") {
                        sort = req.session.perfSort;
                    }
                    console.log(condition);
                    var collection = db.collection(req.session.table);
                    collection.find(condition).sort(sort).toArray(function(err2,docs2){
                        var jsonFile=docs2;
                        //console.log(req.session.perfColType);
                        //console.log(sort);
                        if (req.session.perfColType=="ordinal") {
                            //console.log(docs2);
                            //console.log(req.session.perfColValues);
                            var modifiedJson = new Array();
                            for(var j=0;j<(req.session.perfColValues).length;j++){
                                for(var k=0;k<docs2.length;k++){
                                    if (docs2[k][req.session.perfCol]==req.session.perfColValues[j].value) {
                                        docs2[k][req.session.perfCol]=req.session.perfColValues[j].label
                                        modifiedJson.push(docs2[k]);
                                    }
                                }
                            }
                            var jsonFile = modifiedJson;
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