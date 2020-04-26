const db = require('../data/dbConfig.js');

// return all posts
function find() {
  return db('howto')
}

// returns a howto from the db by its id
function findByID(id) {
  return db('howto')
    .where({id})
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

// removes a howto, returns amount deleted
function remove(id) {
  return db('howto')
    .where({ id })
    .del();
}

module.exports = {
  find,
  findByID,
  add,
  update,
  remove
};