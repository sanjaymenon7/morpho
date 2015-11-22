var express = require('express');
var router = express.Router();

/* GET start start page. */
router.get('/', function(req, res, next) {
    if (req.session.loggedIn) {
        res.render('datasourceselection');
    } else {
        res.render('start');
    }
});

module.exports = router;