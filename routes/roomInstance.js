const express = require('express');
const router = express.Router();
var RoomInstance = require('../models/roominstance');

// RoomInstance 

// GET request by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    RoomInstance.findById({_id: id})
        .then(roomInstance => {
            res.status(200).json(roomInstance);
        })
        .catch(error => {
            res.status(500).send(error)
        });
});

// get all RoomInstance
router.get('/', (req, res) => {
        
        RoomInstance.find({})
        .then(roomInstance => {
            res.status(200).json(roomInstance);
        })
        .catch(error => {
            res.status(500).send(error)
        });
});

module.exports = router;
