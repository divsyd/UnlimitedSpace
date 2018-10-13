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

// Get all rooms
function getRooms(req, res) {
    Room.find({})
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