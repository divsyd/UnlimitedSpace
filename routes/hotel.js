const express = require('express');
const router = express.Router();
var Hotel = require('../models/hotel');

// hotel api

// GET request by id
router.get('/:id', (req, res) => {
    Hotel.findById(req.params.id)
        .then(hotel => {
            res.status(200).json(hotel);
        })
        .catch(error => {
            res.status(500).send(error)
        });
});

// get all
router.get('/', (req, res) => {
    Hotel.find()
        .then(hotels => {
            res.status(200).json(hotels);
        })
        .catch(error => {
            res.status(500).send(error)
        });
});

module.exports = router;
