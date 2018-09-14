// Get dependencies
require('./config/DbServer');
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const app = express();
const cors = require('cors');

app.use(express.static('dist/UnlimitedSpace'));

// Get our API routes
const api = require('./routes/api');
const userApi = require('./routes/user');
const hotelApi = require('./routes/hotel');
const roomApi = require('./routes/room');
const roomInstanceApi = require('./routes/roomInstance');
const orderApi = require('./routes/order');
// Set our api routes
app.use('/api', api);
app.use('/api/user', userApi);
app.use('/api/hotel', hotelApi);
app.use('/api/room', roomApi);
app.use('/api/roominstance', roomInstanceApi);
app.use('/api/order', orderApi);

// for parsing application/x-www-form-urlencoded
// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./dist/UnlimitedSpace'));
// Set our api routes
app.use('/api', api);
//

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

const port = process.env.PORT || 8000;
console.log(`Running on http://localhost:${port}/`);
app.listen(port);
