var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var dblist = "ylist";
var dbname = "libs";
var dbclist = "clist";
/* GET home page. */
router.post('/api/xuan', function(req, res, next) {
    var limit = req.body.limit,
        page = req.body.page
    mongo.find(dblist, dbname, {}, function(result) {
        if (!result) {
            res.send({ code: 0, msg: "失败" })
        } else {
            res.send({ code: 1, data: result })
        }
    }, {
        skip: (page - 1) * limit,
        limit: limit
    })
});
router.post('/api/creat', function(req, res, next) {
    var data = req.body;
    //console.log(data);
    mongo.insert(dblist, dbclist, data, function(result) {
        console.log(result);
        if (!result) {
            res.send({ code: 0, msg: "失败" })
        } else {
            res.send({ code: 1, data: result })
        }
    })
});
router.post('/api/found', function(req, res, next) {
    var uname = req.body.uname;
    mongo.find(dblist, dbclist, { uname: uname }, function(result) {
        if (!result) {
            res.send({ code: 0, msg: "失败" })
        } else {
            res.send({ code: 1, msg: "成功", data: result })
        }
    })
});
module.exports = router;