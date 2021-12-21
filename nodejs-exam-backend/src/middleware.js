const jwt = require('jsonwebtoken');
const { jwtPassword } = require('./config');

const getUserDetails = (req) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : '';
    return jwt.verify(token, jwtPassword);
  } catch (err) {
    return null;
  }
};

const isLoggedIn = (req, res, next) => {
  const userDetails = getUserDetails(req);
  if (userDetails) {
    req.headers.userDetails = userDetails;
    return next();
  }
  return res.status(401).send({ err: 'incorrect details' });
};

module.exports = {
  getUserDetails,
  isLoggedIn,
};
