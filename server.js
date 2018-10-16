// Get dependencies
require('./config/DbServer');
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const app = express();
const cors = require('cors');
const morgan = require('morgan');


// Get our API routes
const api = require('./routes/api');
const userApi = require('./routes/user');
const roomInstanceApi = require('./routes/roomInstance');
const orderApi = require('./routes/order');

// Used for logging (Standard Apache combined log output). Example format:
// :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
if (process.env.NODE_ENV != "production" && process.env.NODE_ENV != "test") {
  app.use(morgan('combined'));
}

// for parsing application/x-www-form-urlencoded
// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
// Set our api routes
app.use('/api', api);
app.use('/api/roominstance', roomInstanceApi);
app.use('/api/order', orderApi);

app.use(cors());
app.use(express.static('./dist/UnlimitedSpace'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/UnlimitedSpace/index.html'));
});

const port = process.env.PORT || 8000;
console.log(`Running on http://localhost:${port}/`);
app.listen(port);

module.exports = app; // used for testing