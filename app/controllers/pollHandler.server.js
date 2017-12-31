'use strict';

const Poll = require('../models/poll.js');

function PollHandler() {

    this.getPolls = function (req, res) {
        Poll
            .find()
            .exec(function (err, result) {
                if (err) throw err;
                res.render('polls.ejs', {
                    polls: result
                });
            });
    };


    this.createPoll = function (req, res) {
        const poll = new Poll(); // create a new instance of the Poll model
        poll.name = req.body.name; // set the polls name (comes from the request)

        console.log(req.body)

        let options = req.body.options;
        poll.options = [];

        options.forEach(function (element, index, array) {
            if (element != "") {
                let option = {
                    name: element,
                    votes: 0,
                    key: index
                }
                poll.options.push(option);
            }
        })


        // save the poll and check for errors
        poll.save(function (err) {
            if (err) res.send('{ "message": "Poll not saved!" }');
            //res.sendStatus(200)
            //.json({ message: 'Poll created!' })
            res.redirect(200, '/poll/polls');
        });
    };


    this.getPollID = function (req, res) {
        Poll.findById(req.params.poll_id)
            .exec(function (err, result) {
                if (err) res.send(err);
                //res.json(poll);
                res.render('poll-detail.ejs', {
                    poll: result
                });
            });
    };


    this.updatePollID = function (req, res) {
        //console.log(req.query) 

        Poll
            // mongodb docs use returnNewDocument
            .findOneAndUpdate({
                '_id': req.params.poll_id,
                "options.key": parseInt(req.query.key)
            }, {
                $inc: {
                    "options.$.votes": 1
                }
            }, {
                new: true
            })
            .exec(function (err, result) {
                if (err) res.send(err);
                console.log(result)
                res.json(result);
            });
    };


    this.deletePollID = function (req, res) {
        Poll.remove({
            _id: req.params.poll_id
        }, function (err, poll) {
            if (err) res.send(err);
            res.json({
                message: 'Successfully deleted poll'
            });
        });
    };

}

module.exports = PollHandler;