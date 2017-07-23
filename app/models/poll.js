// app/models/poll.js

const mongoose = require('../models/mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    name: { type: String, required: true },
    votes: { type: Number, default: 0 },
    key: Number
});

const PollSchema = new Schema({
    name: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    options: [optionSchema]
});

module.exports = mongoose.poll_conn.model('Poll', PollSchema);
