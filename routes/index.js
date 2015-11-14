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

router.get('/mainData',function(req,res,next){
  res.json(phoneInfo.phoneSpecs)
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

// TODO: @Togi Export Service - We need a param/attribute to export one table. See phoneData.js for more comments

module.exports = router;

