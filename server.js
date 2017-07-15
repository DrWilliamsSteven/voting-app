'use strict';

// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var routes = require('./app/routes/index.js');

var passport = require('passport');
var session = require('express-session');
const bodyParser = require('body-parser');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================

//var router = express.Router(); // get an instance of the express Router

//app.set('view engine', 'ejs');
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));


app.use(session({
    secret: 'secretClementine',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);


// START THE SERVER
// =============================================================================

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port + '...');
});
