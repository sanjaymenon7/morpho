var express = require('express');
var router = express.Router();
var configVariables= require('../configVariables');
var exec = require('child_process').exec;
var assert = require('assert');

var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('morphologicalrecommender', server);

// Multer - A lib to manage uploads
var multer  = require('multer');

// A library to change string to hyphen string
var slugify = require("underscore.string/slugify");

// For Linux, Mac - Please change the path of uploads to same folder as MongoDB
var upload = multer({ dest: configVariables.configLines.uploadDestination});

/* GET start start page. */
router.get('/', function(req, res, next) {
    if (req.session.loggedIn) {
        res.render('dataupload');
    } else {
        res.render('start');
    }
});

// Import Service - Upload csv to create a new table
router.post('/',upload.single('data_file'), function(req, res, next) {
    if (req.session.loggedIn) {
        db.open(function(err, db) {
        if(!err) {
            var dataTables = db.collection("datatables");
            var projects = db.collection("projects");
            projects.find({"name":req.body.project_name, "userId": req.session.userId}).toArray(function(err3, docs3) {
                if(docs3.length>0){
                    res.render('datasourceselection',{uploaderror:"true",data: req.session.userId});
                } else{
                    dataTables.find().toArray(function(err, docs) {
                        var tableNumber = docs[0]["tableNumber"];
                        exec('mongoimport --db morphologicalrecommender --collection table'+tableNumber+' --type csv --headerline --file '+configVariables.configLines.uploadDestination+req.file.filename, function(error, stdout, stderr) {
                            console.log('stdout: ' + stdout);
                            console.log('stderr: ' + stderr);
                            if (error !== null) {
                                console.log('exec error: ' + error);
                            } else {
                                exec('mongo morphologicalrecommender --eval "db.runCommand({\\"mapreduce\\" : \\"table'+tableNumber+'\\",\\"map\\" : function() {for (var key in this) { emit(key, null);}},\\"reduce\\" : function(key, stuff) { return null; }, \\"out\\": \\"table'+tableNumber+'\\" + \\"_keys\\"});"', function(error1, stdout1, stderr1) {
                                  console.log('stdout: ' + stdout1);
                                  console.log('stderr: ' + stderr1);
                                  if (error1 !== null) {
                                    console.log('exec error: ' + error1);
                                  } else {
                                    projects.insertOne({"name":req.body.project_name, "description":req.body.project_description, "userId":req.session.userId, "table":"table"+tableNumber}, function(err2, results2){
                                        assert.equal(err2, null);
                                            var collection_distinct = db.collection("table"+tableNumber+"_keys");
                                            var i;
                                            var query = 'db.table'+tableNumber+'_keys.distinct("_id");';
                                            db.eval(query, function(err, result){
                                                result.forEach(function(item, index){
                                                  if (item!="_id") {
                                                    var collection = db.collection("table"+tableNumber);
                                                    var query_distinct = 'db.table'+tableNumber+'.distinct("'+item+'");';
                                                    db.eval(query_distinct, function(err4, docs4){
                                                      console.log(err4);
                                                      var distinct_values = new Array();
                                                      for(var j=0;j<docs4.length;j++){
                                                        var value = {value: docs4[j], id:slugify(item)+"-"+j}
                                                        distinct_values.push(value);
                                                      }
                                                      console.log(item);
                                                      //console.log(distinct_values);
                                                      collection_distinct.update({"_id":item},{"value":distinct_values});
                                                    });
                                                  }
                                                });
                                                dataTables.updateOne({"tableNumber":tableNumber}, {"tableNumber":tableNumber+1}, function(err1, results1){
                                                      assert.equal(err1, null);
                                                      var htmlstr ='<div class="alert alert-dismissible alert-info"><button type="button" class="close" data-dismiss="alert">×</button><strong>Heads up!</strong></div>'
                                                      res.render('datasourceselection',{uploaderror:"success",data: req.session.userId});
                                                });
                                            });
                                    });
                                  }
                                });
                            }
                        });
                    });
                }
            });
        }
      });
    } else {
        res.render('start');
    }

});

module.exports = router;