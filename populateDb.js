#! /usr/bin/env node

console.log('This script populates some data for our database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0]) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
  return
}

// get API models
var async = require('async');
var Hotel = require('./models/hotel');
var Room = require('./models/room');
var Order = require('./models/order');
var User = require('./models/user');

// get connection
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
connectedDb = mongoose.connection;
// delete the whole database to remove existing index
connectedDb.on('open', (() => {
  connectedDb.db.dropDatabase();
}));
mongoose.Promise = global.Promise;
// var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Clear current collections
// db.
// User.remove({}, function (err) {
//   console.log('User collection removed')
// });
// RoomInstance.remove({}, function (err) {
//   console.log('RoomInstance collection removed')
// });
// Room.remove({}, function (err) {
//   console.log('Room collection removed')
// });
// Hotel.remove({}, function (err) {
//   console.log('Hotel collection removed')
// });
// Order.remove({}, function (err) {
//   console.log('Order collection removed')
// });


var users = [];
var orders = [];

function userCreate(email, username, password, date_of_birth, phone, cb) {
  userDetail = {
    username: username,
    password: password,
    date_of_birth: date_of_birth,
    email: email,
    phone: phone
  };

  var user = new User(userDetail);

  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New User: ' + user);
    users.push(user)
    cb(null, user)
  });
}

const hotels = [
  Hotel({
    name: "Hilton Hotel", address: '123 Sydney Road', city: 'Sydney', country: 'Australia', description: "Luxury hotel located in the heart of the city", img: 'assets/images/hilton-01.jpg'
  }),
  Hotel({
    name: 'Sydney backpackers', address: '1 hat Road', city: 'Sydney', country: 'Australia', description: "Budget pricing and central location", img: 'assets/images/sydney-yha-01.jpg'
  }),
  Hotel({
    name: "Oaks Goldsbrough Apartments", address: '243 Pyrmont Street', city: 'Pyrmont', country: 'Australia', description: "Luxury hotel located in the heart of the city", img: 'assets/images/oaks-01.jpg'
  }),
  Hotel({
    name: "The Hotel Windsor", address: '123 Jones Road', city: 'Melbourne', country: 'Australia', description: "Delicious food, wonderful staff, large rooms", img: 'assets/images/windsor-01.jpg'
  }),
  Hotel({
    name: "Chelsea Hotel Toronto", address: '123 Sydney Road', city: 'Toronto', country: 'Canada', 
    description: "The hotel is located conveniently in Toronto and is within a five-minute walk of Toronto Coach Terminal. It has a fitness centre, as well as a sauna, water slides and an indoor pool.", 
    img: 'assets/images/chelsea-01.jpg'
  })
]

Hotel.insertMany(
  hotels
)

const rooms = [
  Room({
    name: 'Standard room', hotel: hotels[0], maxGuest: 4, bedrooms: 2, price: 100, 
    images: [
      "assets/images/hilton-room-01.jpg","assets/images/hilton-room-02.jpg","assets/images/hilton-02.jpg","assets/images/hilton-02.jpg"
    ]
  }),
  Room({
    name: 'Delux Suite', hotel: hotels[0], maxGuest: 8, bedrooms: 4, price: 150, 
    images: [
      "assets/images/hilton-room2-01.jpg","assets/images/hilton-room2-02.jpg","assets/images/hilton-02.jpg","assets/images/hilton-02.jpg"
    ]
  }),
  Room({
    name: 'Dorm', hotel: hotels[1], maxGuest: 1, bedrooms: 1, price: 70,
    images: [
      "assets/images/sydney-yha-dorm-01.jpg","assets/images/sydney-yha-02.jpg","assets/images/sydney-yha-02.jpg","assets/images/sydney-yha-03.jpg",
      "assets/images/sydney-yha-04.jpg"
    ]
  }),
  Room({
    name: 'Standard room', hotel: hotels[1], maxGuest: 2, bedrooms: 1, price: 130,
    images: [
      "assets/images/sydney-yha-standard-01.jpg","assets/images/sydney-yha-01.jpg","assets/images/sydney-yha-02.jpg","assets/images/sydney-yha-03.jpg",
      "assets/images/sydney-yha-04.jpg"
    ]
  }),
  Room({
    name: 'Twin room', hotel: hotels[1], maxGuest: 1, bedrooms: 1, price: 110,
    images: [
      "assets/images/sydney-yha-standard-01.jpg","assets/images/hilton-room-01.jpg","assets/images/hilton-room-02.jpg","assets/images/hilton-02.jpg",
      "assets/images/hilton-02.jpg"
    ]
  }),
  Room({
    name: 'Standard room', hotel: hotels[2], maxGuest: 4, bedrooms: 2, price: 100, 
    images: [
      "assets/images/hilton-room-01.jpg","assets/images/hilton-room-02.jpg","assets/images/hilton-02.jpg","assets/images/hilton-02.jpg"
    ]
  }),
  Room({
    name: 'Standard room', hotel: hotels[3], maxGuest: 4, bedrooms: 2, price: 100, 
    images: [
      "assets/images/hilton-room-01.jpg","assets/images/hilton-room-02.jpg","assets/images/hilton-02.jpg","assets/images/hilton-02.jpg"
    ]
  }),
  Room({
    name: 'Standard room', hotel: hotels[4], maxGuest: 4, bedrooms: 2, price: 100, 
    images: [
      "assets/images/hilton-room-01.jpg","assets/images/hilton-room-02.jpg","assets/images/hilton-02.jpg","assets/images/hilton-02.jpg"
    ]
  })
]

Room.insertMany(
  rooms
)

function roomInstanceCreate(room, status, cb) {
  roomInstanceDetail = { room: room, status: status };

  var roomInstance = new RoomInstance(roomInstanceDetail);

  roomInstance.save(function (err) {
    if (err) {
      cb(err, null);
      return
    }
    console.log('New RoomInstance: ' + roomInstance);
    roomInstances.push(roomInstance);
    cb(null, roomInstance)
  });
}

function orderCreate(room, user, numNights, cb) {
  orderDetail = {
    room: room,
    user: user,
    numNights: numNights,
    fromDate: Date.now(),
    toDate: Date.now()
  };

  var order = new Order(orderDetail);

  order.save(function (err) {
    if (err) {
      cb(err, null);
      return
    }
    console.log('New Order: ' + order);
    orders.push(order);
    cb(null, order);
  });
}

// first_name, family_name, date_of_birth, email, phone
function createUsers(cb) {
  async.parallel([
    function (callback) {
      userCreate('test3@account.com', 'test3User', '$2a$10$QfAZ6EeSXyrW5d1wRWEB/.uJTO1KXg76nxFz0os91SasBWf3d.Ig2', new Date(),
        '0420290211', callback)
    },
    function (callback) {
      userCreate('test4@account.com', 'test2User', "$2a$10$9BKZECM6pQUnGd8oYGz5q.eGMMfyNUDOfEawuVZ1yMwCurTdx.g1O", new Date(), '0420290211', callback)
    },
  ],
    // optional callback
    cb);
}

// room, user, numNights
function createOrders(cb) {
  async.parallel([
    function (callback) {
      orderCreate(rooms[0], users[0], 1, callback);
    },
    function (callback) {
      orderCreate(rooms[1], users[1], 2, callback);
    },
  ],
    // optional callback
    cb);
}

async.series([
  createUsers,
  createOrders
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log('No error on populate');
      // var size = db.collections.hotels.find();
      // console.log(size);

    }
    // All done, disconnect from database
    mongoose.connection.close();
  });
