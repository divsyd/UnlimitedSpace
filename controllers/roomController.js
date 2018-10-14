var Room = require('../models/room');

// room api

// Get room by id
function getRoom(req, res) {
    Room.findOne({ '_id': req.params.id })
        .then(room => {
            res.status(200).json(room);
        })
        .catch(error => {
            res.status(500).send(error)
        });
};

// Get all rooms and sorts by price. Also accepts optonal parameter to get rooms for specific 
// hotel e.g.http://localhost:8000/api/room?hotel=5bc2d402ae96b33360e0a8dc
function getRooms(req, res) {
    let query = {}
    if (req.query.hotel) {
        query = { hotel: req.query.hotel }
    };
    Room.find(query)
        .sort({ price: 1 })
        .then(rooms => {
            res.status(200).json(rooms);
        })
        .catch(error => {
            res.status(500).send(error)
        });
};

// search rooms
function searchRooms(req, res) {

    Room.find({ 'name': { $regex: ".*" + req.params.name + ".*", $options: 'i' } })
        .then(rooms => {
            res.status(200).json(rooms);
        })
        .catch(error => {
            res.status(500).send(error)
        });
};


module.exports = { getRooms, getRoom, searchRooms };