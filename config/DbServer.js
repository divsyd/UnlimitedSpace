// Configuration for DB

const mongoose = require('mongoose');
const mongoDB = process.env.CUSTOMCONNSTR_mongo || 'mongodb://localhost:27017/unlimitedSpaceDb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
require('../models/user');
