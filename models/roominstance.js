var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomInstanceSchema = new Schema(
    {
        room: { type: Schema.Types.ObjectId, ref: 'Room', required: true }, //reference to the associated room
        status: { type: String, required: true, enum: ['Available', 'Maintenance', 'Reserved'], default: 'Available' },
        reservedUntil: { type: Date, default: Date.now }
    }
);

//Export model
module.exports = mongoose.model('RoomInstance', RoomInstanceSchema);