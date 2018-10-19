var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema(
  {
        username:{
          type: String,
        },

        email: {
          type: String,
          unique: true,
          max: 20,
          required: true
        },

        password:{
          type: String,
          required: true,
       },
        date_of_birth: { type: Date },
        phone: { type: String, max: 100 },
    }
);


//Export model
module.exports = mongoose.model('User', UserSchema);
