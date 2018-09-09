// const UserController = require('../controllers/userController');
// import {post} from 'selenium-webdriver/http';
const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel');
const Room = require('../models/room');
const RoomInstance = require('../models/roominstance');

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

// rooms
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

// hotels
router.get('/hotels', (req, res) => {

    // get all hotels
    Hotel.find({})
        .then(hotels => {
            res.status(200).json(hotels);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

// RoomInstance
router.get('/roominstance', (req, res) => {

    // get all rooms
    RoomInstance.find({})
        .then(roomInstance => {
            res.status(200).json(roomInstance);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

// router.post('/users/signup', UserController.registration);
// router.post('/users/login', UserController.loginUser);


module.exports = router;
