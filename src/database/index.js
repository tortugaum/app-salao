require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DBSTRING);
mongoose.Promise = global.Promise;

module.exports = mongoose;