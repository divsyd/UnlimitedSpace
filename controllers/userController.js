const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const bcryptNode = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports = class UserController {
  static registration(req, res) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(result => {
            res.status(201).json({
              message: 'User created!',
              result: result
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      })
  }
  // login function
  static loginUser(req, res) {
    const email = req.body.email  ;
    const password = req.body.password;

    User.findOne({email: email})
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "user doesn't exist"
          });
        }
        return bcrypt.compare(password, user.password);
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "password failed !"
          });
        }
        const token = jwt.sign({email: email}, 'secret', {expiresIn: "1h"});
        res.status(200).json({
          message: 'success',
          token: token
        })
      })
      .catch(err => {
        return res.status(401).json({
          message: "auth failure",
          error: err
        })
      })
  }

  static authentication( req, res, next) {
    const headerExists = req.headers.authentication;
    if (headerExists) {
      // TODO maybe not need to split
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, 'secrete', (error, decoded) => {
        if (error) {
          console.log(error);
          res.status(401).json('Unauthorized');
        } else {
          req.user = decoded.username;
          next();
        }
      });
    } else {
      res.status(403).json('No token provided');
    }
  }
};
