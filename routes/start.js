var express = require('express');
var router = express.Router();

/* GET start start page. */
router.get('/', function(req, res, next) {
    res.render('start');
});

router.post('/submitinitdata',function(req,res,next){
    console.log(req.body);
    console.log(req.rawBody);
    var data = [
        {
            "success": true
        }
    ]
    res.json(data);
})

module.exports = router;


