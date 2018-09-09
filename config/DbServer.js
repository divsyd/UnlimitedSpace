// Configuration for DB

const mongoose = require('mongoose');
const mongoDB = process.env.CUSTOMCONNSTR_mongo || 'mongodb://localhost:27017/unlimitedSpaceDb';
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
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Mongoose disconnected by terminating');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  db.close(() => {
    console.log('Mongoose disconnected by terminating(SIGTERM)');
    process.exit(0);
  });
});
// add User model
require('../models/user');
