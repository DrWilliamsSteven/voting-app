// app/models/bear.js

var mongoose = require('../models/mongoose');
var Schema = mongoose.Schema;

var PollSchema = new Schema({
    name: String,
    food: String,
    options: {
        option1: String,
        option2: String,
        option3: String,
        option4: String
    },
    votes: {
        option1: Number,
        option2: Number,
        option3: Number,
        option4: Number
    }

});

module.exports = mongoose.poll_conn.model('Poll', PollSchema);
