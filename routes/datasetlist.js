var express = require('express');
var router = express.Router();

/* GET start start page. */
router.get('/', function(req, res, next) {
    res.render('datasetlist');
});


var datasetList =
    [
        {
            "id": "ds1",
            "text": "Mobile",
            "name": "Testing"
        },
        {
            "id": "ds2",
            "text": "Business Model"
        },
        {
            "id": "ds3",
            "text": "Cars"
        }
    ]

router.get('/getList',function(req,res,next){
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