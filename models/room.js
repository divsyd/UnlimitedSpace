var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomSchema = new Schema(
    {
        name: { type: String, required: true, max: 100 },
        hotel: {type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
        maxGuest: { type: Number, required: true },
        bedrooms: { type: Number, required: true },
        price: { type: Number, required: true }
    }
);

//Export model
module.exports = mongoose.model('Room', RoomSchema);
