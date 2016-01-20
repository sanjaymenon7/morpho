var express = require('express');
var router = express.Router();

var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('morphologicalrecommender', server);

/* GET start page. */
router.get('/', function(req, res, next) {
    if (req.session.loggedIn) {
        res.render('datasourceselection',{uploaderror:"false", data: req.session.userId});
    } else {
        res.render('start');
    }
});

router.post('/deleteProject',function(req,res,next){
    var reponseJson = {"status": true};
    if (req.session.loggedIn) {
        db.open(function(err, db) {
            if(!err) {
                var projects = db.collection("projects");
                projects.find({userId: req.session.userId, name: req.body.selectedProject}).toArray(function(err, docs) {
                    if (docs.length==1) {
                        var table=db.collection(docs[0]["table"]);
                        var table_keys=db.collection(docs[0]["table"]+"_keys");
                        table.drop(function(err, respose1){
                            table_keys.drop(function(err, response2){
                                projects.deleteOne({userId: req.session.userId, name: req.body.selectedProject}, function(err, response3){
                                    db.close();
                                    res.json(reponseJson);
                                });
                            });
                        });
                    } else{
                        responseJson.status=false;
                        responseJson.message="Project not found or multiple copies of project exist";
                        db.close();
                        res.json(responseJson);
                    }
                });
            }
        });
    } else {
        responseJson.status=false;
        responseJson.message="You are not logged in!";
        res.json(responseJson);
    }
});

module.exports = router;