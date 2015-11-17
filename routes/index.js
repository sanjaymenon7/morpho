var express = require('express');
var router = express.Router();
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

var perfColFilterResponse =
    [
        {
            "CompanyName":"OnePlus",
            "PhoneName":"One",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"5.5 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"401 ppi",
            "Camera":"13 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Quad-core",
            "ClockRate":"2500 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"64 GB",
            "BatteryCapacity":"3100 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"micro"
        },
        {
            "CompanyName":"Motorola",
            "PhoneName":"Moto X",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"5.5 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"403 ppi",
            "Camera":"21 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "ClockRate":"1700 MHz",
            "SystemMemory":"2048 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"3630 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Asus",
            "PhoneName":"Zenfone 2",
            "OperatingSystem":"Android (5.0)",
            "PhysicalSize":"5.5 inches",
            "Resolution":"720 x 1280 pixels",
            "PixelDensity":"265 ppi",
            "Camera":"13 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Quad-core",
            "ClockRate":"1200 MHz",
            "SystemMemory":"2048 MB RAM",
            "BuiltinStorage":"16 GB",
            "BatteryCapacity":"3000 mAh",
            "MultipleSIMCards":1,
            "SIMCard":"micro"
        },
        {
            "CompanyName":"Samsung",
            "PhoneName":"Galaxy S5",
            "OperatingSystem":"Android (5.0)",
            "PhysicalSize":"5.1 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"432 ppi",
            "Camera":"16 megapixels",
            "FrontCamera":"2.1 megapixels",
            "Processor":"Quad-core",
            "ClockRate":"2500 MHz",
            "SystemMemory":"2048 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"2800 mAh",
            "MultipleSIM ards":0,
            "SIMCard":"micro"
        }
    ]

//Mock service to post perfcoldata
router.post('/getPerfColoumnData',function(req,res,next){
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
      }
      res.send(req.body.tablename+' Table Created!');
  });
});

// Export service - Get all data from collection phonedata as JSON file
router.get('/export-data', function(req, res, next) {
  exec('mongoexport --db morphologicalrecommender --collection phonedata --out phonedata.json');
});


module.exports = router;

