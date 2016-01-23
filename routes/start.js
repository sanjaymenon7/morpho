var express = require('express');
var router = express.Router();
var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('morphologicalrecommender', server);

// Multer - A lib to manage uploads
var multer  = require('multer');

// PW encryption
var bcrypt = require('bcrypt-nodejs');

/* GET start page. */
router.get('/', function(req, res, next) {
    if (req.session.loggedIn) {
        res.render('datasourceselection',{uploaderror:"false", data: req.session.userId});
    }
    else {
        res.render('start');
}
});

var data = [
                        {
                            "success": true
                        }
                    ];                 

router.post('/submitinitdata',function(req,res,next){
    db.open(function(err, db) {
		if(!err) {
			var users = db.collection("users");
            var hash = bcrypt.hashSync(req.body.password);
			users.find({"username":req.body.username}).toArray(function(err2, docs) {
				if(docs.length>0 && bcrypt.compareSync(req.body.password, hash)){
                    console.log("User found in DB")
                    router.sess = req.session;
                    router.sess.loggedIn=true;
                    router.sess.userId=req.body.username;
                    data[0].success=true;
                    res.json(data);
                    res.render("datasourceselection",{uploaderror:"false", data: req.session.userId});
                }
                else {
                    console.log("User not found!");
                    res.render("start");
                }
				db.close();
			});
		}
		else {
		console.log(err);
        res.render('start');
    }
	});
    
})

module.exports = router;


