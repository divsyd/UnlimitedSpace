var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema(
    {
      room: { type: Schema.Types.ObjectId, ref: 'Room', required: true }, //reference to the associated room
      // roomInstance: { type: Schema.Types.ObjectId, ref: 'RoomInstance', required: true }, //reference to the associated room
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, //reference to the associated user
      fromDate: { type: Date },
      toDate: { type: Date },
      reservationDate: { type: Date, default: Date.now },
      numNights: { type: Number, required: true }
    }
);

//Export model
module.exports = mongoose.model('Order', OrderSchema);
