const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.headers.authorization

  if(!token) return res.status(401).send('Bad Token')

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}