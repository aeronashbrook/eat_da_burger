var express = require('express');
var burger = require('../models/burger.js');
var router = express.Router();

router.get('/', function(req, res) {
    burger.selectAll(function(data) {
        let object = {
            burgers: data
        };
        console.log(object);
        res.render('index', object);
    });
});
router.post('/api/burgers', function(req, res) {
    burger.insertOne(["burger_name"], [req.body.burger_name], function(result) {
        res.status(200).end();
    });
});
router.put('api/burgers/:id', function(req, res) {
    let condition = 'id = ' + req.params.id;
    burger.updateOne("devoured", req.body.devoured,condition, function(result) {
        if(result.changedRows == 0) {
            // id does not exist
            return res.status(404).end();
        } else {
            // successful
            res.status(200).end();
        };
    });
});
module.exports = router;