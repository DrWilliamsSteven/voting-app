'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var BearHandler = require(path + '/app/controllers/BearHandler.server.js');


module.exports = function(app, passport) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }

    var clickHandler = new ClickHandler();
    var bearHandler = new BearHandler();

    app.route('/')
        .get(isLoggedIn, function(req, res) {
            res.sendFile(path + '/public/index.html');
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
            successRedirect: '/',
            failureRedirect: '/login'
        }));

    app.route('/api/:id/clicks')
        .get(isLoggedIn, clickHandler.getClicks)
        .post(isLoggedIn, clickHandler.addClick)
        .delete(isLoggedIn, clickHandler.resetClicks);


    // on routes that end in /bears
    // ----------------------------------------------------

    app.route('/bear/bears')
        // create a bear (accessed at POST http://localhost:8080/bear/bears)
        .post(bearHandler.createBear)
        // get all the bears (accessed at GET http://localhost:8080/bear/bears)
        .get(bearHandler.getBears);

    app.route('/bear/create-bear')
        .get(function(req, res) {
            res.sendFile(path + '/public/create-bear.html');
        });


    // on routes that end in /bears/:bear_id
    // ----------------------------------------------------
    app.route('/bear/bears/:bear_id')
        // get the bear with that id (accessed at GET http://localhost:8080/bear/bears/:bear_id)
        .get(bearHandler.getBearID)
        // update the bear with this id (accessed at PUT http://localhost:8080/bear/bears/:bear_id)
        .put(bearHandler.updateBearID)
        // delete the bear with this id (accessed at DELETE http://localhost:8080/bear/bears/:bear_id)
        .delete(bearHandler.deleteBearID);



};
