var express = require('express');
var router = express.Router();

/* GET start start page. */
router.get('/', function(req, res, next) {
    res.render('start');
});

router.post('/submitinitdata',function(req,res,next){
    
    // @Togi - set the userId to the retrieved user id from database. I am using static for now
    router.sess = req.session;
    router.sess.loggedIn=true;
    router.sess.userId=1;
    var data = [
        {
            "success": true
        }
    ]
    res.json(data);
})

module.exports = router;


