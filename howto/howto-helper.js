const HowTo = require('./howto-model')

// middleware

function validateAccess(req, res, next) {
  if (req.howto.user_id !== req.auth_id) {
    res.status(403).json({ message: 'You are not authorized to access this resource.' });
  } else {
    next();
  }
}

module.exports = {
  validateAccess
};