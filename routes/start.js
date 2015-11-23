var express = require('express');
var router = express.Router();
var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('morphologicalrecommender', server);

// Multer - A lib to manage uploads
var multer  = require('multer');

/* GET start start page. */
router.get('/', function(req, res, next) {
    res.render('start');
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
			users.find({"username":req.body.username}).toArray(function(err2, docs) {
				if(docs.length>0){
                    router.sess = req.session;
                    router.sess.loggedIn=true;
                    router.sess.userId=req.body.username;
                    data[0].success=true;
                    res.json(data);
                    //res.render("datasourceselection");
                    //res.send("User "+req.query.username+" found!");
                }
                else {
                    // TODO @Togi - Handle the case where we dont have an account. insert this user in db and store his username in session variables
                    console.log(req.body.username);
                    data[0].success=false;
                	res.json(data);
                	//res.render('register');
                }
				db.close();
			});
		}
		else {
		console.log(err);
        res.render('start');
    }
	});
    // @Togi - set the userId to the retrieved user id from database. I am using static for now
    
})

module.exports = router;


