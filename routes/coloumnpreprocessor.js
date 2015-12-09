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
     if (!req.session.loggedIn) {
        res.render("start");
      } else if (!req.session.tableSet) {
        res.render("datasourceselection",{data: req.session.userId});
      } else {
        res.render('coloumnpreprocessor',{data: req.session.userId});
      }  
});

// Service to populate performance coloumn dropdown
router.get('/getPerfColList',function(req,res,next){
    if (!req.session.loggedIn || !req.session.tableSet) {
        responseJson.status=false;
        res.json(responseJson);
      } else {
        db.open(function(err, db) {
            if(!err) {
                var query = 'db.'+req.session.table+'_keys.distinct("_id");';
                db.eval(query, function(err, result){
                    var columns = new Array();
                    for(i=0;i<result.length;i++){
                      if (result[i]!="_id") {
                        var column = {id: i, text: result[i]};
                        columns.push(column);
                      }                     
                    }
                    db.close();
                    res.json(columns);
                });
            }
        });
      }
});

var responseJson =
{
    "status": true
}

/* Sample post request
 { perfColId: 'batterycapacity',
 'selecetedCols[]': [ '0', '1', '2', '3', '6', '8', '9', '10', '11', '12', '13', '14' ] }
* */

router.post('/setDataSet',function(req,res,next){
     if (!req.session.loggedIn || !req.session.tableSet) {
        responseJson.status=false;
        res.json(responseJson);
     } else {
        //console.log(req.body.perfColId);
        //console.log(req.body["selectedCols[]"]);
        router.sess = req.session;
        router.sess.perfSet = true;
        router.sess.performance=req.body.perfColId;
        var columns = new Array();
        for(var i=0;i<req.body["selectedCols[]"].length;i++){
            columns.push(parseInt(req.body["selectedCols[]"][i]))
        }
        //console.log(columns);
        router.sess.columns=columns;
        db.open(function(err, db) {
            if(!err) {
                var query = 'db.'+req.session.table+'_keys.distinct("_id");';
                db.eval(query, function(err, result){
                    var selectedColumns = new Array();
                   selectedColumns.push(result[req.body.perfColId]);
                    for(i=0;i<result.length;i++){
                      if (result[i]!="_id" && i!=req.body.perfColId && columns.indexOf(i)!=-1) {
                        selectedColumns.push(result[i]);
                      }                     
                    }
                    router.sess.selectedCols = selectedColumns;
                    db.close();
                    res.json(responseJson);
                });
            }
        });
     }
});

module.exports = router;