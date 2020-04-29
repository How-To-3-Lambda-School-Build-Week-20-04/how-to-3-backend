const router = require('express').Router()

const Category = require('./category-model')
const Howto = require('../howto/howto-model')

// get all categories
router.get('/', async (req, res) => {
  try {
    Category.getAll()
    .then(message => {
      res.status(200).json(message);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to get categories.', message, stack });
  }
});

router.post('/', validateCategoryInfo, async (req, res) => {
  const category = req.body

  try {
    Category.addCat(category)
    .then(message => {
      res.status(201).json(message)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to add category.', message, stack });
  }
})

router.get('/:id/howto', validateCategoryID, async (req, res) => {
  const id = req.category[0].id
try {
  const howtos = await Category.getHowtos(id);
  if (howtos.length === 0) {
    res.status(200).json({ message: 'There are no howtos for this category.'});
  } else {
    res.status(200).json(howtos);
  }
}
catch ({ message, stack }) {
  res.status(500).json({ error: 'Failed to get howtos for this category.', message, stack });
}
})

// post new category to how-to
router.post('/:id/howto', validateCategoryID, validateHowtoID, async (req, res) => {
  try {
    if(!req.body || !req.body.howto_id) {
      res.status(400).json({ error: "Missing field required: howto_id."})
    } else {
      req.body.category_id = req.category[0].id
      await Category.assignCat(req.body)
      .then(HowtoCat => {
        res.status(201).json(HowtoCat)
      })
    }
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed assign category to howto.', message, stack });
  }
})

// removes a category from the database, and removes all howto connections
router.delete('/:id', validateCategoryID, async (req, res) => {
  try {
    const id = req.category[0].id
    await Category.remove(id)
    .then(removed => {
      res.status(201).json(removed)
    })
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed assign category to howto.', message, stack });
  }
})

// removes a category from a how-to
router.delete('/:id/howto', validateCategoryID, validateHowtoID, async (req, res) => {
  try {
    if(!req.body || !req.body.howto_id) {
      res.status(400).json({ error: "Missing field required: howto_id."})
    } else {
      req.body.category_id = req.category[0].id
      await Category.removeCat(req.body)
      .then(response => {
        res.status(201).json(response)
      })
    }
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed assign category to howto.', message, stack });
  }
})

// middleware

function validateCategoryID(req, res, next) {
  return Category.getOne({ id: req.params.id })
    .then(category => {
      if (!category) {
        res.status(404).json({ message: 'Category with the specified id was not found.' });
      } else {
        req.category = category;
        next();
      }
    })
}

function validateHowtoID(req, res, next) {
  const id = req.body.howto_id

  if (req.method === 'POST' || req.method === 'DELETE') { 
    return Howto.findByID(id)
    .then(howto => {
      if (!howto) {
        res.status(404).json({ message: 'How-to with the specified id was not found.' });
      } else {
        req.howto = howto;
        next();
      }
    });
  } else {
    return Howto.findByID(req.query.howid)
    .then(howto => {
      if (!howto) {
        res.status(404).json({ message: 'How-to with the specified id was not found.' });
      } else {
        req.howto = howto;
        next();
      }
    });
  }
}

function validateCategoryInfo(req, res, next) {
  if (!req.body || !req.body.name) {
    res.status(400).json({ message: 'Missing required field for category: name.' });
  } else {
    next();
  }
}

module.exports = router;