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
  const { email, password } = req.body

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

function genToken(user) {
  if (
    !user ||
    typeof user.id === "undefined" ||
    typeof user.username === "undefined"
  ) {
    new error("username and id needed");
  }
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = process.env.TOKEN_SECRET;
  const options = {
    expiresIn: process.env.TOKEN_LIFE || "12h",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = {
  restricted,
  bodyCheck,
  genToken
}