const router = require('express').Router();
const Howto = require('./howto-model');
const User = require('../users/users-model');
const { validateUserID } = require('./howto-helper')

// returns all posts with any attached categories
router.get('/', async (req, res) => {
  try {
    Howto.find()
    .then(found => {
      res.status(200).json(found)
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to return the posts." })
    })
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to get the posts.', message, stack });
  }
})

// returns a single post by its id
router.get('/:id', async (req, res) => {
  try {
    Howto.findByID(req.params.id)
    .then(found => {
      res.status(200).json(found)
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to return the posts." })
    })
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to add the post.', message, stack });
  }
})

// returns a post by user's id
router.get('/user/:id', async (req, res) => {
  try {
    Howto.findByUserID(req.params.id)
    .then(found => {
      res.status(200).json(found)
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to return the posts." })
    })
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to get the post.', message, stack });
  }
})

// will reject if no user_id is in the body
router.post('/', async (req, res) => {
  const newHowTo = req.body

  try {
    Howto.add(newHowTo)
      .then(response => {
        res.status(201).json(response)
      })
      .catch(err => {
        res.status(500).json({ error: "Something went wrong.", err })
      })
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to add category.', message, stack });
  }
});

// id should be the howto's id
router.put('/:id', validateUserID, async (req, res) => {
  const changes = req.body
  const id = req.params.id

  try {
    Howto.update(changes, id)
      .then(updated => {
        res.status(200).json(updated)
      })
      .catch(() => {
        res.status(500).json({ error: "Something went wrong returning the updated post." })
      });
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to update the post.', message, stack });
  }
})

// id should be the howto's id
router.delete('/:id/delete', validateUserID, async (req, res) => {
  const id = req.params.id

  try {
    Howto.remove(id)
    .then(removed => {
      res.status(200).json(removed)
    })
    .catch(err => {
      res.status(500).json({ error: "Unable to remove post at this time." })
    })
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to delete the post.', message, stack });
  }
})

module.exports = router;