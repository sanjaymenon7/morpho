var express = require('express');
var router = express.Router();
var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('morphologicalrecommender', server);
var phoneInfo = require('../data/phoneData');


// Multer - A lib to manage uploads
var multer  = require('multer');

// For Linux, Mac - Please change the path of uploads to same folder as MongoDB
var upload = multer({ dest: 'c:/data/csv' })
var exec = require('child_process').exec;




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: 'Express',data: phoneInfo.phoneSpecs });
 // res.json(phoneInfo.phoneSpecs)
 //res.send(phoneInfo.phoneSpecs[0].CompanyName);
 //console.log(phoneInfo.phoneSpecs[0]);
});
//Mock Service to populate mock main data
router.get('/mainData',function(req,res,next){
  res.json(phoneInfo.phoneSpecs)
})

var coloumnList =
    [
        {
            "id": 0,
            "text": "Zero"
        },
        {
            "id": 1,
            "text": "One"
        },
        {
            "id": 2,
            "text": "Two"
        }
    ]
//Mock service to populate performance coloumn dropdown
router.get('/perfColoumnData',function(req,res,next){
    res.json(coloumnList)
})


// Upload form for now - Later we need to create a view
router.get('/upload', function(req, res) {
  res.send('<form action="/create-table" method="post" enctype="multipart/form-data"><input name="data_file" type="file">Table Name<input name="tablename" type="text"><input type="Submit" value="Upload"></form>');
});

// Import Service - Upload csv to create a new table
router.post('/create-table',upload.single('data_file'), function(req, res, next) {
  exec('mongoimport --db morphologicalrecommender --collection '+req.body.tablename+' --type csv --headerline --file C:\\data\\csv\\'+req.file.filename, function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
          console.log('exec error: ' + error);
          } else {
            exec('mongo morphologicalrecommender --eval "db.runCommand({\\"mapreduce\\" : \\"'+req.body.tablename+'\\",\\"map\\" : function() {for (var key in this) { emit(key, null);}},\\"reduce\\" : function(key, stuff) { return null; }, \\"out\\": \\"'+req.body.tablename+'\\" + \\"_keys\\"});"', function(error1, stdout1, stderr1) {
              console.log('stdout: ' + stdout1);
              console.log('stderr: ' + stderr1);
              if (error1 !== null) {
                console.log('exec error: ' + error1);
              } else {
                res.send(req.body.tablename+" Table Created!!");
              }
            });
          }
  });
});

// Export service - Get all data from collection phonedata as JSON file
router.get('/export-data', function(req, res, next) {
  exec('mongoexport --db morphologicalrecommender --collection phonedata --out phonedata.json');
});

// Export service - Get all data from collection phonedata as JSON file
router.get('/get-columns', function(req, res, next) {
  db.open(function(err, db) {
  if(!err) {
    var columnJSON = new Array();
    
    var col_id = 0;
    var data_id;
    var i=0;
    var query = 'db.'+req.query.table+'_keys.distinct("_id");';
    db.eval(query, function(err, result){
        for(i=0;i<result.length;i++){
          if (result[i]!="_id") {
            var header = {column_header:{name:result[i], id:col_id, is_performance:false, is_selected: false}, column_data: new Array()};
            var collection = db.collection(req.query.table);
            var field = result[i];
            columnJSON.push(header);
            col_id++;
          }
        }
        collection.find({}).toArray(function(err, docs) {
              for(i=0;i<result.length;i++){
                if (result[i]!="_id") {
                  data_id=0;
                  for(var j=0;j<docs.length;j++){
                    columnJSON[i].column_data.push({value:docs[j][result[i]], id:data_id, is_clicked: false, is_recommended: false});
                    data_id++;
                  }
                }
                
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

