// app/models/bear.js

var mongoose = require('../models/mongoose');
var Schema = mongoose.Schema;

var BearSchema = new Schema({
    name: String,
    food: String
});

module.exports = mongoose.bear_conn.model('Bear', BearSchema);
