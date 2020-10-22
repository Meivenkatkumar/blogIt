const jwt = require('jsonwebtoken');
const config = require("../config/config");

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeader = req.headers.authorization || (req.cookies && req.cookies.token && `Bearer ${req.cookies.token}`);
    let result;
    console.log(req.cookies, authorizationHeader);

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: config.sessionExpiryTime,
        issuer: config.jwtIssuer
      };
      const JWT_SECRET= config.JWT_SECRET
      try {
        result = jwt.verify(token, JWT_SECRET, options);
        next();
      } catch (err) {
        return res.status(200).json({success: false, msg: "Invalid Token, Verification failed."});
      }
    } else {
      return res.status(200).json({success: false, msg: "Authentication Token Required."});
    }
  }
};

