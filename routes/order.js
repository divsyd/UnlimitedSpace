const express = require('express');
const router = express.Router();
var Order = require('../models/order');
const checkAuth = require('../middleware/check-auth');

// order api

// get all
router.get('/',checkAuth,(req, res) => {
  Order.find()
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});
// GET request by user id
router.get('/:userId', (req, res) => {
  Order.findById({ 'user': req.params.userId })
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
