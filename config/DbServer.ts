// Configuration for DB
import * as mongoose from 'mongoose';
const  mongoDB = 'mongodb://localhost:27017/unlimitedSpaceDb';
const  db = mongoose.connection;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
require('../models/user');
