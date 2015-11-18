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
            "id": "pixeldensity",
            "text": "Pixel Density",
            "name": "Testing"
        },
        {
            "id": "builtinstorage",
            "text": "Built-in Storage"
        },
        {
            "id": "batterycapacity",
            "text": "Battery Capacity"
        }
    ]

var coloumnList2 =
    [
        {
            "id": "A",
            "text": "Battery Capacity",
            "selected" :"true"
        },
        {
            "id": "B",
            "text": "System Memory",
            "selected" :"true"
        },
        {
            "id": "C",
            "text": "builtinstorage",
            "selected" :"true"
        }
    ]
//Mock service to populate performance coloumn dropdown
router.get('/perfColoumnData',function(req,res,next){
    res.json(coloumnList)
})

//added for temp otherColumns data
router.get('/allColumnData', function(req,res,next){
    res.json(coloumnList2)
})

var perfColFilterResponse =
    [
        {
            "column_header": {
                "name": "Battery Capacity",
                "id": 0,
                "is_performance": false,
                "is_selected": false
            },
            "column_data": [
                {
                    "value": "3100 mAh",
                    "id": 0,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3630 mAh",
                    "id": 1,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3000 mAh",
                    "id": 2,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2800 mAh",
                    "id": 3,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3050 mAh",
                    "id": 4,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2600 mAh",
                    "id": 5,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2600 mAh",
                    "id": 6,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2100 mAh",
                    "id": 7,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3000 mAh",
                    "id": 8,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2525 mAh",
                    "id": 9,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2550 mAh",
                    "id": 10,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3220 mAh",
                    "id": 11,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2700 mAh",
                    "id": 12,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3430 mAh",
                    "id": 13,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2600 mAh",
                    "id": 14,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2930 mAh",
                    "id": 15,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3000 mAh",
                    "id": 16,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2930 mAh",
                    "id": 17,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2600 mAh",
                    "id": 18,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2400 mAh",
                    "id": 19,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2300 mAh",
                    "id": 20,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3000 mAh",
                    "id": 21,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2700 mAh",
                    "id": 22,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3000 mAh",
                    "id": 23,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3120 mAh",
                    "id": 24,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3450 mAh",
                    "id": 25,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2900 mAh",
                    "id": 26,
                    "is_clicked": false,
                    "is_recommended": false
                }
            ]
        },
        {
            "column_header": {
                "name": "System Memory",
                "id": 14,
                "is_performance": false,
                "is_selected": false
            },
            "column_data": [
                {
                    "value": "3072 MB RAM",
                    "id": 0,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2048 MB RAM",
                    "id": 1,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2048 MB RAM",
                    "id": 2,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2048 MB RAM",
                    "id": 3,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2048 MB RAM",
                    "id": 4,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "1024 MB RAM",
                    "id": 5,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "1536 MB RAM",
                    "id": 6,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "1024 MB RAM",
                    "id": 7,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "4096 MB RAM",
                    "id": 8,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3072 MB RAM",
                    "id": 9,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3072 MB RAM",
                    "id": 10,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3072 MB RAM",
                    "id": 11,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2048 MB RAM",
                    "id": 12,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3072 MB RAM",
                    "id": 13,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3072 MB RAM",
                    "id": 14,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2048 MB RAM",
                    "id": 15,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3072 MB RAM",
                    "id": 16,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3072 MB RAM",
                    "id": 17,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "16 GB RAM",
                    "id": 18,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "16 GB RAM",
                    "id": 19,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "8 GB RAM",
                    "id": 20,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3072 MB RAM",
                    "id": 21,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2048 MB RAM",
                    "id": 22,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3072 MB RAM",
                    "id": 23,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "2048 MB RAM",
                    "id": 24,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3072 MB RAM",
                    "id": 25,
                    "is_clicked": false,
                    "is_recommended": false
                },
                {
                    "value": "3072 MB RAM",
                    "id": 26,
                    "is_clicked": false,
                    "is_recommended": false
                }
            ]
        }
    ]

//Mock service to post perfcoldata
router.post('/getPerfColoumnData',function(req,res,next){
    console.log(req.body);
    console.log(req.rawBody);
    res.json(perfColFilterResponse)
})

router.post('/getAllColoumnData',function(req,res,next){
    console.log(req.body);
    console.log(req.rawBody);
    res.json(perfColFilterResponse)
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

