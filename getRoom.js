#! /usr/bin/env node

console.log('This script populates some data for our database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Hotel = require('./models/hotel')
var Room = require('./models/room')
var RoomInstance = require('./models/roominstance.js')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const roomId = "5b8c953d9fcb7933c0282a0f"
Room.findOne({ '_id': roomId })
    .then(room => {
        console.log(room)
    })
    .catch(error => {
        console.error(error)
    });

