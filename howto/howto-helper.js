
const HowTo = require('./howto-model')

// checks to see if the user's ID matches what they're trying to edit
async function validateUserID(req, res, next) {
  const howto = req.params.id

  try {
    if(req.method === 'PUT') {
      if(!req.body || !req.body.user_id) {
        res.status(400).json({ error: "Check your body." })
      } else {
        const post_exists = await HowTo.findByID(howto)

        if(post_exists.user_id !== parseInt(req.query.user_id)) {
          res.status(403).json({ error: "That's not yours. "})
        } else {
          next()
        }
      }
    } else { // this will run for DELETE request
      if(!req.query.user_id) {
        res.status(400).json({ error: "Check your query parameters." })
      } else {
        const post_exists = await HowTo.findByID(howto)

        if(post_exists.user_id !== parseInt(req.query.user_id)) {
          res.status(403).json({ error: "That's not yours. "})
        } else {
          next()
        }
      }
    }
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed validation check.', message, stack });
  }
}

module.exports = {
  validateUserID

};