const router = require('express').Router();
const User = require('./users-model.js');

// get all users
/*
router.get('/', async (req, res) => {
  try {
    User.getAll()
    .then(found => {
      res.status(200).json(found)
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to return the user." })
    })
  } catch (error) {
    res.status(500).json({ error: "Unable to contact the database." })
  }
})
*/

// get a user by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    User.getByID(id)
    .then(found => {
      res.status(200).json(found)
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to return the user." })
    })
  } catch (error) {
    res.status(500).json({ error: "Unable to contact the database." })
  }
})

// get a user by username
router.get('/u/search', async (req, res) => {
  const username = req.query.username
  User.getByUName({username})
  .then(found => {
    res.status(200).json(found)
  })
  .catch(err => {
    res.status(500).json({ error: "Failed to return the user." })
  })
})

// get a user's how-to posts by the user's ID
router.get('/:id/posts', async (req, res) => {
  const id = req.params.id

  try {
    User.getUserPosts(id)
    .then(found => {
      res.status(200).json(found)
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to return the user's posts.", err })
    })
  } catch (error) {
    res.status(500).json({ error: "Unable to contact the database." })
  }
})

module.exports = router;