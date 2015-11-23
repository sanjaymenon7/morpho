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
                    res.send("Sorry "+req.body.project_name+" already exists in our database");
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
                                        //console.log("project inserted");
                                        dataTables.updateOne({"tableNumber":tableNumber}, {"tableNumber":tableNumber+1}, function(err1, results1){
                                            assert.equal(err1, null);
                                            //console.log("table number incremented");
                                            db.close();
                                            router.sess = req.session;
                                            router.sess.tableSet = true;
                                            router.sess.table="table"+tableNumber;
                                            res.render('coloumnpreprocessor');
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