const jwt = require("jsonwebtoken");
const backend = require('../config/backEnv');
// check whether there is a token within post request
module.exports = (req, res, next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, backend.secrete);
    next();
  }
  catch (e) {
    res.status(401).json({
      message: "authorization failed"
    });
  }
};
