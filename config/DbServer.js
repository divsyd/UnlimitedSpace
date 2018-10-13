// Configuration for DB
const config = require('config')
// Connects to 'mongodb://localhost:27017/unlimitedSpaceDb' by default or cloud db when NODE_ENV:production connection string is set on host
const mongoDB = config.dbConfig.host

const mongoose = require('mongoose');
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Add more listener for mongoose
db.on('connected', () => { console.log('Mongoose connected'); });
db.on('disconnected',
  () => { console.log('\nMongoose disconnected'); });
db.on('error',
  (err => console.log('Mongoose connection error' + err)));

// Add an notification when User Ctl+c terminates the db connection
process.on('SIGTERM', () => {
  db.close(() => {
    console.log('Mongoose disconnected by terminating(SIGTERM)');
    process.exit(0);
  });
});
// add User model
require('../models/user');
