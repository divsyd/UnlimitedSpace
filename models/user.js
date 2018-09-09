var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// var OrderSchema = new Schema ({
//   roomInstance: {type: Schema.Types.ObjectId, ref: 'RoomInstance', required: true}, //reference to the associated room
//   reservationDate: {type: Date, default: Date.now},
//   numNights: {type: Number, required: true}
// })
var UserSchema = new Schema(
    {
        // first_name: { type: String, required: true, max: 100 },
        // family_name: { type: String, required: true, max: 100 },
        username:{
          type: String,
          unique: true,
          required: true,
        },
        password:{
          type: String,
          required: true,
       },
        date_of_birth: { type: Date },
        email: { type: String, max: 100 },
        phone: { type: String, max: 100 }
    }
);

// Virtual for user's full name
// UserSchema
//     .virtual('name')
//     .get(function () {
//         return this.family_name + ', ' + this.first_name;
//     });

//Export model
module.exports = mongoose.model('User', UserSchema);
