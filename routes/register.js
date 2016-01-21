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
var bcrypt = require('bcrypt-nodejs')

/* GET register page. */
router.get('/', function(req, res, next) {
    res.render('register');
});

var data = [
                        {
                            "success": true
                        }
                    ];               

/* Register service */
router.post('/registernewuser',function(req,res,next){
    db.open(function(err, db) {
		if(!err) {
			var users = db.collection("users");
            var hash = bcrypt.hashSync(req.body.password);
			users.find({"username":req.body.username}).toArray(function(err2, docs) {
				if(docs.length>0){
                    console.log("User already exists!")
                    res.render("register");
                }
                else {
                    users.insert({"username":req.body.username, "password":hash});
                    console.log("New user inserted into DB!");
                    router.sess = req.session;
                    router.sess.loggedIn=true;
                    router.sess.userId=req.body.username;
                    data[0].success=true;
                    res.json(data);
                    res.render("datasourceselection",{uploaderror:"false", data: req.session.userId});
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


