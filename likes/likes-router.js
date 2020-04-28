const router = require('express').Router();
const Likes = require('./likes-model.js');

// all routes are protected by requiring a token currently
// certain routes might require further middleware before making actions to db

router.get('/', async (req, res) => {
  res.json({ message: "likes router here" })
})

module.exports = router;