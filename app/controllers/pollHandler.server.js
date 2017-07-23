'use strict';

const Poll = require('../models/poll.js');

function PollHandler() {

    this.getPolls = function(req, res) {
        Poll
            .find()
            .exec(function(err, result) {
                if (err) throw err;
                res.render('polls.ejs', { polls: result });
            });
    };


    this.createPoll = function(req, res) {
        const poll = new Poll(); // create a new instance of the Poll model
        poll.name = req.body.name; // set the polls name (comes from the request)
        poll.food = req.body.food;
        //poll.options = {};
        poll.options.option1 = req.body.option1;
        poll.options.option2 = req.body.option2;
        poll.options.option3 = req.body.option3;
        poll.options.option4 = req.body.option4;

        // set all votes to zero
        poll.votes.option1 = 0;
        poll.votes.option2 = 0;
        poll.votes.option3 = 0;
        poll.votes.option4 = 0;
        // save the poll and check for errors
        poll.save(function(err) {
            if (err) res.send(err);
            //res.json({ message: 'Poll created!' });
            res.redirect('/poll/polls');
        });
    };


    this.getPollID = function(req, res) {
        Poll.findById(req.params.poll_id)
            .exec(function(err, result) {
                if (err) res.send(err);
                //res.json(poll);
                res.render('poll-detail.ejs', { poll: result });
            });
    };


    this.updatePollID = function(req, res) {
        console.log(req.query.id)
        const param_id = 'votes.' + req.query.id;
        const query = {};
        query[param_id] = 1;

        Poll
            .findOneAndUpdate({ '_id': req.params.poll_id }, { $inc: query }, { new: true }) // mongodb docs use returnNewDocument
            .exec(function(err, result) {
                if (err) res.send(err);
                //console.log(result)
                res.json(result);
            });
    };


    this.deletePollID = function(req, res) {
        Poll.remove({ _id: req.params.poll_id }, function(err, poll) {
            if (err) res.send(err);
            res.json({ message: 'Successfully deleted poll' });
        });
    };

}

module.exports = PollHandler;
