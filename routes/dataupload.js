var express = require('express');
var router = express.Router();

/* GET start start page. */
router.get('/', function(req, res, next) {
    res.render('dataupload');
});

module.exports = router;