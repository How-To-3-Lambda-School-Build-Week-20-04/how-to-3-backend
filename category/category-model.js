const db = require('../data/dbConfig')
const Likes = require('../likes/likes-model')

function getAll() {
  return db('category')
}

function getOne(filter) {
  return db('category')
  .where(filter).first()
}

// gets all howtos on a category
async function getHowtos(category_id) {
  const howto = await db('howto_category as hc')
    .join('category as c', 'c.id', 'hc.category_id')
    .join('howto as h', 'h.id', 'hc.howto_id')
    .where({category_id})
    .select(
      'c.name as category_name',
      'h.id as howto_id', 'h.title as howto_title', 'h.post as howto_post', 'h.created_at'
    )

    return Promise.all(
      howto.map(async i => {
        const likes = await Likes.getHowtoLikes(i.howto_id)

        return i = {
          ...i,
          likes: likes.length
        }
      })
    )
}


// gets all categories on a how-to
async function getCategories(howto_id) {
  const categories = await db('howto_category as hc')
    .join('category as c', 'c.id', 'hc.category_id')
    .where({ howto_id })
    .select('c.id', 'c.name')

  return howto = await db('howto')
    .where({id: howto_id}).first()
    .then(async next => {
      const likes = await Likes.getHowtoLikes(howto_id)

      return next = {
        ...next,
        likes: likes.length,
        categories
      }
    })
}

// add a new category to the db
async function addCat(cat) {
  const [newCat] = await db('category')
  .insert(cat)
  return getOne({id: newCat})
}

// assign a category to a how-to
async function assignCat({ howto_id, category_id }) {
  await db('howto_category')
    .insert({ howto_id, category_id })
    .returning('howto_id')
  
  return getCategories(howto_id)
}

// not active, updates a category
function update(id, changes) {
  return db('category')
    .where({ id })
    .update(changes)
    .returning('*');
}


// removes a category and its connections to any how-to posts
async function remove(id) {
  await db('howto_category')
    .where('category_id', '=', id)
    .del()
    
  return db('category')
    .where({ id })
    .del();
}

// removes a how-to and category connection, returns how-to and its remaining categories
async function removeCat({ howto_id, category_id }) {
  await db('howto_category')
    .where({ howto_id, category_id })
    .del();

  return getCategories(howto_id);
}

module.exports = {
  getAll,
  getOne,
  getHowtos,
  addCat,
  assignCat,
  update,
  remove,
  removeCat,
  getCategories
};