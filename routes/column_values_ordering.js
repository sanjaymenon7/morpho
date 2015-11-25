/**
 * Created by kaushik on 21.11.15.
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
    res.render('column_values_ordering');
});


router.post('/column_values_ordering_post',function(req,res,next){
    res.json(dataNumeric);

})

module.exports = router;


