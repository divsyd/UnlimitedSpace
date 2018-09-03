import mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt-nodejs');
export class UserController {
  static registration(req, res) {
    console.log(req);
    const username = req.body.username;
    const password = req.body.password;

    User.create({
      username: username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, function(err, user) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        console.log('user create');
        res.status(201).json(user);
      }
    });
  }
  // login function
  static loginUser(req, res) {
    console.log('reach the login part');
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
      username: username
    }).exec(function (err, user) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        console.log('user login');
        if (bcrypt.compareSync(password, user.password)) {
          res.status(200).json(user);
        } else {
          res.status(401).json('unauthorized');
        }

      }
    });
  }

}
