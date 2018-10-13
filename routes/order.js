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

// create order
router.post('/',(req, res) => {
  const order = new Order({
    roomInstance: req.body.roomInstance,
    user: req.body.user,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    numNights: req.body.numNights
  });
  order.save()
    .then(order => {
      res.status(201).json(order);
    })
    .catch(error => {
      res.status(400).send(error);
    })
});

// update order
router.put('/',(req, res) => {
  const order = new Order({
    _id: req.body.id,
    roomInstance: req.body.roomInstance,
    user: req.body.user,
    numNights: req.body.numNights
  });
  order.update()
    .then(order => {
      res.status(200).json(order);
    })
    .catch(error => {
      res.status(400).send(error);
    })
});

// delete request by order id
router.delete('/delete/:id', (req, res) => {
  Order.deleteOne({'_id': req.params.id})
    .then(order => {
      res.status(204).json(order);
    })
    .catch(error => {
      res.status(400).send(error);
    })
});

module.exports = router;
