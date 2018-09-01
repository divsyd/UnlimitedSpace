// Get dependencies
import {DbServer} from './DbServer';

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const app = express();

// Get our API routes
const api = require('../routes/api');
// DB server
DbServer.buildConnection();


app.use(express.static('../dist/UnlimitedSpace'));

// Set our api routes
app.use('/api', api);

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing application/json
app.use(bodyParser.json());



app.get('/*', function(req, res) {
  res.sendFile(path.join(path.dirname(__dirname).split(path.sep).pop() + '/dist/UnlimitedSpace/index.html'));
});

console.log('Running on http://localhost:8000/');
app.listen(8000);
