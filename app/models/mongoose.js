require('dotenv').load();
var mongoose = require('mongoose');

// connect to mongodb
mongoose.user_conn = mongoose.createConnection(process.env.MONGO_URI);
mongoose.bear_conn = mongoose.createConnection(process.env.MONGO_URI_BEARS);
mongoose.Promise = global.Promise;

module.exports = mongoose;