const Hotel = require('../models/hotel');

// Get hotel by id
function getHotel(req, res) {
    Hotel.findById(req.params.id)
        .then(hotel => {
            res.status(200).json(hotel);
        })
        .catch(error => {
            res.status(500).send(error)
        });
}


// get all hotels
function getHotels(req, res) {
    Hotel.find({})
        .then(hotels => {
            res.status(200).json(hotels);
        })
        .catch(error => {
            res.status(500).send(error)
        });
}

module.exports = { getHotels, getHotel };
