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
        //bear.options = {};
        bear.options.option1 = req.body.option1;
        bear.options.option2 = req.body.option2;
        bear.options.option3 = req.body.option3;
        bear.options.option4 = req.body.option4;

        // set all votes to zero
        bear.votes.option1 = 0;
        bear.votes.option2 = 0;
        bear.votes.option3 = 0;
        bear.votes.option4 = 0;
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
                //res.json(bear);
                res.render('bear-detail.ejs', { bear: result });
            });
    };

    this.updateBearID = function(req, res) {
        console.log(req.query.id)
        const param_id = 'votes.' + req.query.id;
        const query = {};
        query[param_id] = 1;

        Bear
            .findOneAndUpdate({ '_id': req.params.bear_id }, { $inc: query }, { new: true })
            .exec(function(err, result) {
                if (err) res.send(err);
                //console.log(result)
                res.json(result);
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
