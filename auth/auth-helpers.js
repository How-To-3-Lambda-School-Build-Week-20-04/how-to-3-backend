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

function bodyCheck (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  if (!req.body || !email || !req.body.username || !password) {
    res.status(400).json({ error: "Missing required information." })
  } else {
    if (!email.includes("@")) {
      res.status(400).json({ error: "Email syntax appears to be incorrect." })
    } else if (password.length < 6) {
      res.status(400).json({ error: "Password not secure enough." })
    } else {
      next()
    }
  }
}

module.exports = {
  restricted,
  bodyCheck
}