'use strict';

// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express');
const routes = require('./app/routes/index.js');

const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

if (process.env.NODE_ENV === 'production') {
    //app.use(errorHandler());
    // additional prod environemtn configuration
} else if (process.env.NODE_ENV === 'development') {
    const errorHandler = require('errorhandler');
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
    require('dotenv').load();
}

require('./app/config/passport')(passport);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================


app.set('view engine', 'ejs');
// set static views
app.use(express.static(__dirname + '/app/views'));
app.set('views', './app/views');

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
    console.log('Node.js listening on port ' + port + '... in ' + process.env.NODE_ENV + ' mode');
});
