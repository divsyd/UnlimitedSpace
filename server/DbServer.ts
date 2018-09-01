// const mongoose = require('mongoose');
// const mongoDB = 'mongodb://localhost:27017/unlimitedSpaceDb';
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
import * as mongoose from 'mongoose';
export class DbServer {
  static mongoDB = 'mongodb://localhost:27017/unlimitedSpaceDb';
  static db = mongoose.connection;

  constructor() {
  }

  public static buildConnection() {
    mongoose.connect(this.mongoDB);
    mongoose.Promise = global.Promise;
    this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }

}
