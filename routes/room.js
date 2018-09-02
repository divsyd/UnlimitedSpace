const express = require('express');
const router = express.Router();
var Room = require('../models/room');
var RoomDetailed = require('../models/room');


// room api

// GET request by id
router.get('/:id', (req, res) => {
    Room.findById(req.params.id)
        .then(room => {
            res.status(200).json(room);
        })
        .catch(error => {
            res.status(500).send(error)
        });
});

router.get('/', (req, res) => {
    // get all rooms
    Room.find({})
        .then(rooms => {
            res.status(200).json(rooms);
        })
        .catch(error => {
            res.status(500).send(error)
        });
});

module.exports = router;