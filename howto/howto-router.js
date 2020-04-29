const router = require('express').Router();
const Howto = require('./howto-model');
const User = require('../users/users-model');

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
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' })
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
  } catch (error) {
    res.status(500).json({ error: "Unable to remove post at this time." })
  }
})

// middleware

async function validateUserID(req, res, next) {
  const how_id = req.params.id
  try {
    if(req.method === 'PUT') {
      if(!req.body || !req.body.user_id) {
        res.status(400).json({ error: "Check your body." })
      } else {
        const [post_exists] = await Howto.findByUserID(req.body.user_id)
  
        if(post_exists.user_id === req.body.user_id) {
          next()
        } else {
          res.status(403).json({ error: "That's not yours. "})
        }
      }
    } else { // this will run for DELETE request
      if(!req.query.user_id) {
        res.status(400).json({ error: "Check your query parameters." })
      } else {
        const [post_exists] = await Howto.findByUserID(req.query.user_id)

        if(post_exists.user_id === parseInt(req.query.user_id)) {
          next()
        } else {
          res.status(403).json({ error: "That's not yours. "})
        }
      }
    }
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed validation check.', message, stack });
  }
}

module.exports = router;