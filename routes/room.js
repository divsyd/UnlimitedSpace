const express = require('express');
const router = express.Router();
var Room = require('../models/room');
var RoomDetailed = require('../models/room');
var mongoose = require('mongoose');


// room api

// GET request by id
router.get('/:id', (req, res) => {
    Room.findOne({ '_id': req.params.id })
        .then(room => {
            res.status(200).json(room);
        })
        .catch(error => {
            res.status(500).send(error)
        });
});

// get all rooms
router.get('/', (req, res) => {
    Room.find({})
        .then(rooms => {
            res.status(200).json(rooms);
        })
        .catch(error => {
            res.status(500).send(error)
        });
});

// search rooms
router.get('/name/:name', (req, res) => {

  // Room.find({'name': req.params.name})
  Room.find({'name': {$regex: ".*" + req.params.name + ".*"}})
    .then(rooms => {
      res.status(200).json(rooms);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

module.exports = router;
