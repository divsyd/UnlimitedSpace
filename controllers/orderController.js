/** order api
 * order's CRUD operations
 */
const Order = require('../models/order');

// get all orders
function getAllOrders(req, res) {
  Order.find()
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(error => {
      res.status(500).send(error);
    });
}


// GET orders by user id
function getOrdersByUserId(req, res) {
  Order.find({'user': req.params.userId}).populate('room')
    .then(orders => {
      // const ids = orders.map(order => order.room);
      // Room.find({'_id': {$in: ids}})
      //   .then(rooms => {
          console.log(orders);
          console.log()
          res.status(200).json(orders);
        // })
    })
    .catch(error => {
      res.status(500).send(error);
    });
}

// create order
function createOrder(req, res) {
  const order = new Order(req.body);
  order.save()
    .then(order => {
      res.status(201).json(order);
    })
    .catch(error => {
      res.status(400).send(error);
    })
}

// update order
function updateOrder(req, res) {
  Order.findByIdAndUpdate(req.params.id, {
    $set: {numNights: req.body.numNights}
  }, {
    new: true
  }).then(order => {
    res.status(200).json(order);
  })
    .catch(error => {
      res.status(400).send(error);
    })
}

// delete order by id
function deleteOrderById(req, res) {
  Order.deleteOne({'_id': req.params.id})
    .then(order => {
      res.status(204).json(order);
    })
    .catch(error => {
      res.status(400).send(error);
    })
}

module.exports = {getAllOrders, getOrdersByUserId, createOrder, updateOrder, deleteOrderById};
