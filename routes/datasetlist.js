var express = require('express');
var router = express.Router();
var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('morphologicalrecommender', server);

// Multer - A lib to manage uploads
var multer  = require('multer');

/* GET start start page. */
router.get('/', function(req, res, next) {
    if (req.session.loggedIn) {
        res.render('datasetlist');
    } else {
        res.render('start');
    }
});

router.get('/getList',function(req,res,next){
    if (req.session.loggedIn) {
        db.open(function(err, db) {
            if(!err) {
                var projects = db.collection("projects");
                projects.find({userId: req.session.userId}).toArray(function(err, docs) {
                    var projects_array = new Array();
                    for(var i=0;i<docs.length;i++){
                        var project = {text:docs[i]["name"], description: docs[i]["description"]};
                        projects_array.push(project);
                    }
                    db.close();
                    res.json(projects_array);
                });
            }
        });
    } else {
        res.render('start');
    }
});

reponseJson =
{
    "status": true
}

router.post('/setDataSet',function(req,res,next){
    //console.log(req.body.selectedProject);
    if (req.session.loggedIn) {
        db.open(function(err, db) {
            if(!err) {
                var projects = db.collection("projects");
                projects.find({userId: req.session.userId, name: req.body.selectedProject}).toArray(function(err, docs) {
                    if (docs.length==1) {
                        router.sess = req.session;
                        router.sess.tableSet = true;
                        router.sess.table=docs[0]["table"];
                        res.json(reponseJson);
                        //res.render('coloumnpreprocessor',{data: req.session.userId})
                    } else{
                        res.send("Project not found or multiple copies of project exist");
                    }
                    db.close();
                });
            }
        });
    } else {
        res.render('start');
    }
})

module.exports = router;