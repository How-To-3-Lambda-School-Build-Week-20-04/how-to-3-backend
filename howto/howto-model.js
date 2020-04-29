const db = require('../data/dbConfig');
const Cat = require('../category/category-model');
const Likes = require('../likes/likes-model');

// return all posts
async function find() {
  const howto = await db('howto')

  return Promise.all(
    howto.map(async i => {
      const cat =  await db('howto_category as hc')
      .join('category as c', 'c.id', 'hc.category_id')
      .where({ howto_id: i.id })
      .select('c.id', 'c.name')

      const likes = await Likes.getHowtoLikes(i.id)

      return i = {
        ...i,
        likes: likes.length,
        categories: cat
      }
    })
  )
}

// returns a how-to from the db by its id
async function findByID(id) {
  const howto = await db('howto').where({id}).first()
  
  return Cat.getCategories(howto.id)
}

// returns a how-to from the db by the user's id
async function findByUserID(user_id) {
  const howto = await db('howto').where({user_id})
  
  return Promise.all(
    howto.map(async i => {
      const cat = await db('howto_category as hc')
      .join('category as c', 'c.id', 'hc.category_id')
      .where({ howto_id: i.id })
      .select('c.id', 'c.name')

      const likes = await Likes.getHowtoLikes(i.id)

      return i = {
        ...i,
        likes: likes.length,
        categories: cat
      }
    })
  )
}

// adds a new howto and returns what was submitted to the db
function add(howto) {
  return db('howto')
    .insert(howto, 'id')
    .then(([id]) => {
      return findByID(id)
    })
}

// updates an existing howto and returns the new information
function update(changes, id) {
  return db('howto')
    .where({ id })
    .update(changes)
    .then(() => {
      return findByID(id)
    })
}

// removes a howto and all connections
async function remove(id) {
  await db('howto_category')
    .where({ howto_id: id })
    .del()

  await db('likes')
    .where({howto_id: id})
    .del()

  return db('howto')
    .where({ id })
    .del();
}


module.exports = {
  find,
  findByID,
  findByUserID,
  add,
  update,
  remove
};