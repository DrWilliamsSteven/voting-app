require('dotenv').load();
var mongoose = require('mongoose');

// connect to mongodb
mongoose.user_conn = mongoose.createConnection(process.env.MONGO_URI);
mongoose.poll_conn = mongoose.createConnection(process.env.MONGO_URI_POLLS);
mongoose.Promise = global.Promise;

module.exports = mongoose;
