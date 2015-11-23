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

/* Sample post request
 { perfColId: 'batterycapacity',
 'selecetedCols[]': [ '0', '1', '2', '3', '6', '8', '9', '10', '11', '12', '13', '14' ] }
* */

router.post('/setDataSet',function(req,res,next){
    console.log(req.body);
    console.log(req.rawBody);
    res.json(reponseJson)
})


module.exports = router;