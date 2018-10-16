var Room = require('../models/room');
var mongoose = require('mongoose');


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
    let query = [];

    // Allows sorting results by hotel and then price
    if (req.query.sort) {
        query.push(
            {
                $sort: {
                    hotel: 1, price: 1
                }
            }
        )
    }

    // Allows limiting results to specific hotel
    if (req.query.hotel) {
        query.push(
            {
                $match: {
                    hotel: mongoose.Types.ObjectId(req.query.hotel)
                }
            }
        )
    }

    // Allows limiting the number of results returned
    if (req.query.limit) {
        query.push(
            { $limit: +req.query.limit }
        )
    }

    // If no options set, run a normal find. Otherwise, we use the aggregate pipline to filter/sort
    if (query.length === 0) {
        Room.find({})
            .then(rooms => {
                res.status(200).json(rooms);
            })
            .catch(error => {
                res.status(500).send(error)
            });
    } else {
        Room.aggregate(query)
            .then(rooms => {
                res.status(200).json(rooms);
            })
            .catch(error => {
                res.status(500).send(error)
            });

    };

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