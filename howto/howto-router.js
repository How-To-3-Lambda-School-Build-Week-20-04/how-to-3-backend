const router = require('express').Router();
const Howto = require('./howto-model.js');

// all routes are protected by requiring a token currently
// certain routes might require further middleware before making actions to db

router.get('/', async (req, res) => {
  try {
    Howto.find()
    .then(found => {
      res.status(200).json(found)
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to return the posts." })
    })
  } catch (error) {
    res.status(500).json({ error: "Unable to contact the database." })
  }
})

router.get('/:id', async (req, res) => {
  try {
    Howto.findByID(req.params.id)
    .then(found => {
      res.status(200).json(found)
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to return the posts." })
    })
  } catch (error) {
    res.status(500).json({ error: "Unable to contact the database." })
  }
})

router.get('/user/:id', async (req, res) => {
  try {
    Howto.findByUserID(req.params.id)
    .then(found => {
      res.status(200).json(found)
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to return the posts." })
    })
  } catch (error) {
    res.status(500).json({ error: "Unable to contact the database." })
  }
})

// TO-DO
// get post by user ID


// will reject if no user_id is in the body
router.post('/', async (req, res) => {
  const newHowTo = req.body

  try {
    Howto.add(newHowTo)
      .then(response => {
        res.status(201).json(response)
      })
      .catch(err => {
        res.status(400).json({ error: "Check your body.", err })
      })
  } catch (error) {
    res.status(500).json({ error: "Problem saving to database." })
}
});

// id should be the howto's id
// TO-DO should also require the user's id to make sure its their own post

router.put('/:id', async (req, res) => {
  const changes = req.body
  const id = req.params.id

  try {
    Howto.findByID(id) // check to see if the post exists first
    .then(() => {
      Howto.update(changes, id)
        .then(updated => {
          res.status(200).json(updated)
        })
        .catch(() => {
          res.status(500).json({ error: "Something went wrong returning the updated post." })
        })
    })
    .catch(() => {
      res.status(500).json({ error: 'Something went wrong finding the post.' })
    })
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// id should be the howto's id
// TO-DO should also require the user's id to make sure its their own post

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    Howto.findByID(id)
    .then(found => {
      if(found) {
        Howto.remove(id)
        .then(removed => {
          res.status(200).json({ message: `Successfully removed ${removed} post.` })
        })
      }
    })
    .catch(() => {
      res.status(404).json({ error: "No post found with that id." })
    })
  } catch (error) {
    res.status(500).json({ error: "Unable to remove post at this time." })
  }
})

module.exports = router;