'use strict';

var mongoose = require('../models/mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    github: {
        id: String,
        displayName: String,
        username: String,
        publicRepos: Number
    },
    nbrClicks: {
        clicks: Number
    }
});

module.exports = mongoose.user_conn.model('User', User);
