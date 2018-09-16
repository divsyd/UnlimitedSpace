#! /usr/bin/env node

console.log('This script populates some data for our database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

// get API models
var async = require('async');
var Hotel = require('./models/hotel');
var Room = require('./models/room');
var RoomInstance = require('./models/roominstance');
// var Order = require('./models/order');
var User = require('./models/user');

// get connection
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Clear current collections
User.remove({}, function (err) {
  console.log('User collection removed')
});
RoomInstance.remove({}, function (err) {
    console.log('RoomInstance collection removed')
});
Room.remove({}, function (err) {
    console.log('Room collection removed')
});
Hotel.remove({}, function (err) {
    console.log('Hotel collection removed')
});
// Order.remove({}, function (err) {
//     console.log('Order collection removed')
// });


var users = [];
var hotels = [];
var rooms = [];
var roomInstances = [];
// var orders = [];

function userCreate(username, password, date_of_birth, email, phone, [orders],cb) {
  userDetail = {
    username: username,
    password: password,
    date_of_birth: date_of_birth,
    email: email,
    phone: phone,
    orders: [orders]
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

function hotelCreate(name, address, city, country, cb) {
    hotelDetail = { name: name, address: address, city: city, country: country };

    var hotel = new Hotel(hotelDetail);

    hotel.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Hotel: ' + hotel);
        hotels.push(hotel)
        cb(null, hotel)
    });
}

function roomCreate(name, hotel, maxGuest, bedrooms, cb) {
    roomDetail = { name: name, hotel: hotel, maxGuest: maxGuest, bedrooms: bedrooms }

    var room = new Room(roomDetail);

    room.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Room: ' + room);
        rooms.push(room)
        cb(null, room)
    });
}

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

// function orderCreate(roomInstance, user, numNights, cb) {
//   orderDetail = { roomInstance: roomInstance, user: user, numNights: numNights };
//
//   var order = new Order(orderDetail);
//
//   order.save(function (err) {
//     if (err) {
//       cb(err, null);
//       return
//     }
//     console.log('New Order: ' + order);
//     orders.push(order);
//     cb(null, order);
//   });
// }



// name, address, city, country, cb
function createHotels(cb) {
    async.parallel([
        function (callback) {
            hotelCreate('Hilton Hotel', '123 Sydney Road', 'Sydney', 'Australia', callback);
        },
        function (callback) {
            hotelCreate('Sydney backpackers', '1 hat Road', 'Sydney', 'Australia', callback);
        },
    ],
        // optional callback
        cb);
}

// name, hotel, maxGuest, rooms, cb
function createRooms(cb) {
    async.parallel([
        function (callback) {
            roomCreate('Standard room', hotels[0], 4, 2, callback);
        },
        function (callback) {
            roomCreate('Delux Suite', hotels[0], 8, 4, callback);
        },
        function (callback) {
            roomCreate('Dorm', hotels[1], 1, 1, callback);
        },
        function (callback) {
            roomCreate('Standard room', hotels[1], 2, 1, callback);
        },
        function (callback) {
            roomCreate('Twin room', hotels[1], 4, 1, callback);
        },
    ],
        // optional callback
        cb);
}

// room, status, reservedUntil, cb
function createRoomInstances(cb) {
    async.parallel([
        function (callback) {
            roomInstanceCreate(rooms[0], "Available", callback);
        },
        function (callback) {
            roomInstanceCreate(rooms[0], "Maintenance", callback);
        },
        function (callback) {
            roomInstanceCreate(rooms[1], "Reserved", callback);
        },
        function (callback) {
            roomInstanceCreate(rooms[1], "Available", callback);
        },
        function (callback) {
            roomInstanceCreate(rooms[2], "Available", callback);
        },
        function (callback) {
            roomInstanceCreate(rooms[2], "Reserved", callback);
        },
        function (callback) {
            roomInstanceCreate(rooms[3], "Available", callback);
        },
        function (callback) {
            roomInstanceCreate(rooms[3], "Available", callback);
        },
        function (callback) {
            roomInstanceCreate(rooms[4], "Available", callback);
        },
    ],
        // optional callback
        cb);
}

// roomInstance, user, numNights
// function createOrders(cb) {
//   async.parallel([
//       function (callback) {
//         orderCreate(roomInstances[0], users[0], 1, callback);
//       },
//       function (callback) {
//         orderCreate(roomInstances[1], users[1], 2, callback);
//       },
//     ],
//     // optional callback
//     cb);
// }

// first_name, family_name, date_of_birth, email, phone
function createUsers(cb) {
  async.parallel([
      function (callback) {
        userCreate('David Evans', '123456', new Date(), '123@123.com', '0420290211',[
          { roomInstance: roomInstances[0], //reference to the associated room
            numNights: 2}
        ],callback);
      },
      function (callback) {
        userCreate('Lingying Yang', '123456', new Date(), '321@321.com', '0420290212', [
          { roomInstance: roomInstances[1], numNights: 3 },
          { roomInstance: roomInstances[2], numNights: 4 },
        ],callback);
      },
    ],
    // optional callback
    cb);
}

async.series([
    createHotels,
    createRooms,
    createRoomInstances,
    createUsers
    // createOrders
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
