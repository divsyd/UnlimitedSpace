const express = require('express');
const router = express.Router();
var User = require('../models/user');

// user api

// get all
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// GET request by id
router.get('/:id', (req, res) => {
  User.findOne({ 'user': req.params.id })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
