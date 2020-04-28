const db = require('../data/dbConfig')

function getAll() {
  return db('category')
}

function getOne(filter) {
  return db('category')
  .where(filter)
}

function getHowtos(category_id) {
  console.log(category_id)

  return db('howto_category as hc')
    .join('category as c', 'c.id', 'hc.category_id')
    .join('howto as h', 'h.id', 'hc.howto_id')
    .where({category_id})
    .select(
      'c.name as category_name',
      'h.id as howto_id', 'h.title as howto_title', 'h.post as howto_post', 'h.created_at'
    )
}

function addCat(cat) {
  return db('category')
  .insert(cat)
  .returning('*')
}

async function assignCat({ howto_id, category_id }) {
  const [cat_id] = await db('howto_category')
    .insert({ howto_id, category_id })
    .returning('category_id')

  return getHowtos(category_id)
}

function update(id, changes) {
  return db('category')
    .where({ id })
    .update(changes)
    .returning('*');
}

function remove(id) {
  return db('category')
    .where({ id })
    .del();
}

async function removeCat({ howto_id, category_id }) {
  await db('howto_category').where({ howto_id, category_id }).del();

  return getHowtos(category_id);
}

module.exports = {
  getAll,
  getOne,
  getHowtos,
  addCat,
  assignCat,
  update,
  remove,
  removeCat
};