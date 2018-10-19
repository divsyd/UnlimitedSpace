const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const backEnd = require('../config/backEnv');

// the class contains methods to handle front-end requests for user api
module.exports = class UserController {
  // registration method to create new users
  static registration(req, res) {
    let userId = '';
    if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(401).json({
        message: "the two password is not equal"
      });
    } // hashing password add salt
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(result => {
            userId = result._id;
            const token = jwt.sign({email: req.body.email}, backEnd.secrete, {expiresIn: backEnd.expireIn});
            res.status(201).json({
                message: 'User created!',
                token: token,
                expiresIn: 3600,
                result: result,
                userId: userId,
                userEmail: req.body.email
              }
            );
          })
          .catch(err => {
            res.status(500).json({
              message: "email has been used",
              error: err
            });
          });
      })
  }
  //  user login function also return web token to front end
  static loginUser(req, res) {
    const email = req.body.email  ;
    const password = req.body.password;
    let userId = '';

    User.findOne({email: email})
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "user doesn't exist"
          });
        }
        userId = user._id;
        return bcrypt.compare(password, user.password);
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "password error !"
          });
        }
        const token = jwt.sign({email: email}, 'secret', {expiresIn: "1h"});
        res.status(200).json({
          message: 'success',
          expiresIn: 3600,
          token: token,
          userId: userId,
          userEmail: email
        })
      })
      .catch(err => {
        return res.status(401).json({
          message: "auth failure",
          error: err
        })
      })
  }
};
