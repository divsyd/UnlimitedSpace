// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const uuidv1 = require('uuid/v1');
const _ = require('lodash');
const app = express();

// Get our API routes
const api = require('./routes/api');

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/unlimitedSpaceDb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static('dist/UnlimitedSpace'));

// Set our api routes
app.use('/api', api);

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing application/json
app.use(bodyParser.json());

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/UnlimitedSpace/index.html'));
});

console.log('Running on http://localhost:8000/');
app.listen(8000);