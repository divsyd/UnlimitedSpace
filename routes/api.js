
const UserController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const HotelController = require('../controllers/HotelController');
const RoomController = require('../controllers/RoomController');
const OrderController = require('../controllers/orderController');
const checkAuth = require('../middleware/check-auth');

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

// User api
router.post('/users/signup', UserController.registration);
router.post('/users/login', UserController.loginUser);

// Hotel api
router.get('/hotel', HotelController.getHotels);
router.get('/hotel/:id', HotelController.getHotel);

// Room api
router.get('/room', RoomController.getRooms);
router.get('/room/:id', RoomController.getRoom);
router.get('/room/name/:name', RoomController.searchRooms);

// Order api
router.get('/order', checkAuth, OrderController.getAllOrders);
router.get('/order/:userId', checkAuth, OrderController.getOrdersByUserId);
router.post('/order', checkAuth, OrderController.createOrder);
router.put('/order/:id', checkAuth, OrderController.updateOrder);
router.delete('/order/:id', checkAuth, OrderController.deleteOrderById);

module.exports = router;
