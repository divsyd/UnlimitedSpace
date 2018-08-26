var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HotelSchema = new Schema(
    {
        name: { type: String, required: true, max: 100 },
        address: { type: String, required: true, max: 100 },
        city: { type: String, required: true, max: 100 },
        country: { type: String, required: true, max: 100 }
    }
);

//Export model
module.exports = mongoose.model('Hotel', HotelSchema);
