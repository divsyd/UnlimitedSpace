// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const uuidv1 = require('uuid/v1');
const _ = require('lodash');
const app = express();

app.use(express.static('dist/UnlimitedSpace'));

// Get our API routes
const api = require('./routes/api');
const userApi = require('./routes/user');
const hotelApi = require('./routes/hotel');
const roomApi = require('./routes/room');
const roomInstanceApi = require('./routes/roomInstance');
const orderApi = require('./routes/order');

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/unlimitedSpaceDb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set our api routes
app.use('/api', api);
app.use('/api/user', userApi);
app.use('/api/hotel', hotelApi);
app.use('/api/room', roomApi);
app.use('/api/roominstance', roomInstanceApi);
app.use('/api/order', orderApi);


// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing application/json
app.use(bodyParser.json());

app.get('/*', function (req, res) {
  // res.sendFile(path.join(__dirname + '/dist/UnlimitedSpace/index.html'));
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

console.log('Running on http://localhost:8000/');
app.listen(8000);
