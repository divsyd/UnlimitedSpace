var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema(
    {
        roomInstance: { type: Schema.Types.ObjectId, ref: 'RoomInstance', required: true }, //reference to the associated room
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, //reference to the associated user
        reservationDate: { type: Date, default: Date.now },
        numNights: { type: number, required: true }
    }
);

//Export model
module.exports = mongoose.model('OrderInstance', OrderInstanceSchema);