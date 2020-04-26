require('dotenv').config();
const jwt = require('jsonwebtoken')

function restricted (req, res, next) {
  const token = req.headers.authorization

  if(!token) return res.status(400).json({ error: 'No Token' })

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ error: 'Invalid Token' })
  }
}

module.exports = {
  restricted
}