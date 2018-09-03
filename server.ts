// Get dependencies
require('./config/DbServer');
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const app = express();
const cors = require('cors');
// Get our API routes
const api = require('./routes/api');
// for parsing application/x-www-form-urlencoded
// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./dist/UnlimitedSpace'));
// Set our api routes
app.use('/api', api);
//
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/UnlimitedSpace/index.html'));
});

console.log('Running on http://localhost:8000/');
app.listen(8000);
