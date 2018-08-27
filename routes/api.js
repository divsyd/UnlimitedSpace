const express = require('express');
const router = express.Router();

var Room = require('../models/room');
var Hotel = require('../models/hotel');




/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

// Get all posts
router.get('/rooms', (req, res) => {

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