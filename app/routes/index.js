'use strict';

const path = process.cwd();
const ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
const PollHandler = require(path + '/app/controllers/PollHandler.server.js');


module.exports = function(app, passport) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }

    const clickHandler = new ClickHandler();
    const pollHandler = new PollHandler();

    app.route('/')
        .get(isLoggedIn, function(req, res) {
            //res.sendFile(path + '/public/index.html');
            res.redirect('/poll/');
        });

    app.route('/login')
        .get(function(req, res) {
            res.sendFile(path + '/public/login.html');
        });

    app.route('/logout')
        .get(function(req, res) {
            req.logout();
            res.redirect('/login');
        });

    app.route('/profile')
        .get(isLoggedIn, function(req, res) {
            res.sendFile(path + '/public/profile.html');
        });

    app.route('/api/:id')
        .get(isLoggedIn, function(req, res) {
            res.json(req.user.github);
        });

    app.route('/auth/github')
        .get(passport.authenticate('github'));

    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
            successRedirect: '/poll/',
            failureRedirect: '/login'
        }));

    app.route('/api/:id/clicks')
        .get(isLoggedIn, clickHandler.getClicks)
        .post(isLoggedIn, clickHandler.addClick)
        .delete(isLoggedIn, clickHandler.resetClicks);


    // on routes that end in /polls
    // ----------------------------------------------------

    app.route('/poll/')
        .get(isLoggedIn, function(req, res) {
            res.redirect('/poll/polls');
        });

    app.route('/poll/polls')
        // create a poll (accessed at POST http://localhost:8080/poll/polls)
        .post(isLoggedIn, pollHandler.createPoll)
        // get all the polls (accessed at GET http://localhost:8080/poll/polls)
        .get(isLoggedIn, pollHandler.getPolls);

    app.route('/poll/create-poll')
        .get(isLoggedIn, function(req, res) {
            res.sendFile(path + '/public/create-poll.html');
        });


    // on routes that end in /polls/:poll_id
    // ----------------------------------------------------
    app.route('/poll/polls/:poll_id')
        // get the poll with that id (accessed at GET http://localhost:8080/poll/polls/:poll_id)
        .get(isLoggedIn, pollHandler.getPollID)
        // update the poll with this id (accessed at PUT http://localhost:8080/poll/polls/:poll_id)
        .put(isLoggedIn, pollHandler.updatePollID)
        // delete the poll with this id (accessed at DELETE http://localhost:8080/poll/polls/:poll_id)
        .delete(pollHandler.deletePollID);

};
