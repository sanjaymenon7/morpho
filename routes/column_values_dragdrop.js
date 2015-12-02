/**
 * Created by kaushik on 27.11.15.
 * for ordering the column values based on input from user.
 * The user will order the values in the performance column.
 */


var express = require('express');
var router = express.Router();
var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('morphologicalrecommender', server);
// use the performance column value from session variable.
//
var responseJson =
{
    "status": true
}

var dataOrdinal = [
    {
        columnName:"Test Column",
        dataType:"ordinal",
        values:[
            {
                value: "4.1",
                acv: "1"
            },
            {
                value:"4.5",
                acv: "1"
            },
            {
                value:"4.7",
                acv: "1"
            },
            {
                value:"4.9",
                acv: "1"
            },
            {
                value:"5.0",
                acv: "1"
            },
            {
                value:"5.1",
                acv: "1"
            },
            {
                value:"5.5",
                acv: "1"
            },
            {
                value:"5.7",
                acv: "1"
            },
            {
                value:"5.9",
                acv: "1"
            }
        ]
    }
];

var dataNumeric = [
    {
        columnName:"Test Column",
        dataType:"numeric",
        values:[
            {
                value: "4.1",
                acv: "1"
            },
            {
                value:"4.5",
                acv: "1"
            },
            {
                value:"4.7",
                acv: "1"
            },
            {
                value:"4.9",
                acv: "1"
            },
            {
                value:"5.0",
                acv: "1"
            },
            {
                value:"5.1",
                acv: "1"
            },
            {
                value:"5.5",
                acv: "1"
            },
            {
                value:"5.7",
                acv: "1"
            },
            {
                value:"5.9",
                acv: "1"
            }
        ]
    }
];

/* GET */
router.get('/', function(req, res, next) {
    //if (!req.session.loggedIn) {
    //    res.render("start");
    //} else if (!req.session.tableSet) {
    //    res.render("datasourceselection");
    //} else if(!req.session.perfSet){
    //    res.render('coloumnpreprocessor');
    //} else {
    //    res.render('column_values_dragdrop');
    //}
    console.log('in function of get colummnvaluesdragdrop');

    res.render('column_values_dragdrop');
});


router.post('/column_values_dragdrop_post',function(req,res,next){
    //if (!req.session.loggedIn || !req.session.tableSet || !req.session.perfSet) {
    //    responseJson.status=false;
    //    res.json(responseJson);
    //} else {
    //    res.json(dataNumeric);
    //}
    res.json(dataOrdinal);
})

var findColumns = function(req, number_flag, callback){
    db.open(function(err, db) {
        if(!err) {
            var collection = db.collection(req.query.table);
            var collection_keys = db.collection(req.query.table+"_keys");
            collection.findOne({}, function(err, doc) {
                var query = 'db.'+req.query.table+'_keys.distinct("_id");';
                db.eval(query, function(err, result){
                    var columns = new Array();
                    for(i=0;i<result.length;i++){
                        if (number_flag==1) {
                            if (doc.hasOwnProperty(result[i]) && typeof doc[result[i]] === "number") {
                                var column = {id: i, text: result[i]};
                                columns.push(column);
                            }
                        } else {
                            if (doc.hasOwnProperty(result[i]) && typeof doc[result[i]] !== "number") {
                                var column = {id: i, text: result[i]};
                                columns.push(column);
                            }
                        }
                    }
                    db.close();
                    callback(columns);
                });
            });
        }
    });
}

module.exports = router;

