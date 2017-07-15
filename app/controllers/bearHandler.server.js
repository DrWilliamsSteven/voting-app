'use strict';

var Bear = require('../models/bear.js');

function BearHandler() {

    this.getBears = function(req, res) {
        Bear
            .find()
            .exec(function(err, result) {
                if (err) throw err;
                res.render('bears.ejs', { bears: result });
            });
    };


    this.createBear = function(req, res) {
        var bear = new Bear(); // create a new instance of the Bear model
        bear.name = req.body.name; // set the bears name (comes from the request)
        bear.food = req.body.food;
        // save the bear and check for errors
        bear.save(function(err) {
            if (err) res.send(err);
            //res.json({ message: 'Bear created!' });
            res.redirect('/bear/bears');
        });
    };


    this.getBearID = function(req, res) {
        Bear.findById(req.params.bear_id)
            .exec(function(err, result) {
                if (err) res.send(err);
                // res.json(bear);
                //res.render('bear-detail.ejs', { bear: result });
            });
    };

    this.updateBearID = function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err) res.send(err);

            bear.name = req.body.name;
            bear.food = req.body.food; // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err) res.send(err);
                res.json({ message: 'Bear updated!' });
            });
        });
    };

    this.deleteBearID = function(req, res) {
        Bear.remove({ _id: req.params.bear_id }, function(err, bear) {
            if (err) res.send(err);
            res.json({ message: 'Successfully deleted bear' });
        });
    };



}

module.exports = BearHandler;
