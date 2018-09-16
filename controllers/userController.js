const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports = class UserController {
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
        if (bcrypt.compareSync(password, user.password)) {
          console.log('user login');
          const token = jwt.sign({ username: user.username },
                                  'secrete',
                                  { expiresIn: 3600 });
          res.status(200).json({ success: true, token: token });
        } else {
          res.status(401).json( { message: 'unauthorized' } );
        }

      }
    });
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
