var express = require('express');
var router = express.Router();

/* GET all users in collection "Users" */
router.get('/showallusers', function(req, res, next) {
	db.open(function(err, db) {
	res.send(db.users.find());
  });
	db.close();
});

/* Check, whether username already exists */
router.get('/usercheck', function(req, res, next) {
	db.open(function(err, db) {
		if(!err) {
			var users = db.collection("users");
			users.find({"username":req.body.username}).toArray(function(err2, docs) {
				if(docs.length>0){
                    res.send("User "+req.body.username+" found!");
                }
                else {
                	res.send("User not found!");
                	//res.render('register');
                }
			});
		}
		else {
        res.render('start');
    }
	});
	db.close();
});

module.exports = router;
