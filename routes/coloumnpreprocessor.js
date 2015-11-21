var express = require('express');
var router = express.Router();

/* GET start start page. */
router.get('/', function(req, res, next) {
    res.render('coloumnpreprocessor');
});


var datasetList =
    [
        {
            "id": "pixeldensity",
            "text": "Pixel Density",
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

router.get('/getPerfColList',function(req,res,next){
    res.json(datasetList)
});

reponseJson =
{
    "status": true
}

router.post('/setDataSet',function(req,res,next){
    console.log(req.body);
    console.log(req.rawBody);
    res.json(reponseJson)
})


module.exports = router;