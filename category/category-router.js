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

router.get('/:id/howto', validateCategoryID, validateHowtoID, async (req, res) => {
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
// requires name, howto_id, and category_id
router.post('/:id/howto', validateCategoryID, validateHowtoID, async (req, res) => {
  try {
    if(!req.body || !req.body.howto_id) {
      res.status(400).json({ error: "Missing field required: howto_id."})
    } else {
      req.body.category_id = req.category[0].id
      res.status(201).json(await Category.assignCat(req.body))
    }
  } catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed assign category to howto.', message, stack });
  }
  
} )

/* req.body, req.category, req.howto
{ howto_id: '1' }
[ { id: 1, name: 'General' } ]
{
  id: 1,
  title: 'How to Put on a Medical Mask',
  post: 'Understand what a medical mask protects you from. 
Medical or surgical masks are intended to cover both your mouth and nose. They are designed with material that can block large-particle droplets, splashes, sprays and splatter — all of which may contain viruses or bacteria that may be harmful to you.',
  created_at: '2020-04-28 15:33:29',
  user_id: 1
}
*/

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

  if (req.method === 'POST') { 
    return Howto.findByID(id).first()
    .then(howto => {
      if (!howto) {
        res.status(404).json({ message: 'How-to with the specified id was not found.' });
      } else {
        req.howto = howto;
        next();
      }
    });
  } else {
    return Howto.findByID(req.query.howid).first()
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