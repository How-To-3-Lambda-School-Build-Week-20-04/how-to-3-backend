const db = require('../data/dbConfig.js');

// this file is used by auth-router

function getAll() {
  return db('user')
}

function getBy(filter) {
  return db('user')
    .where(filter)
}

async function add(user) {
  const [id] = await db('user')
    .insert(user)
    .returning('id');
  
  return getBy({ id }).first();
}

// updates an existing user and returns the new information
function update(changes, id) {
  return db('user')
    .where({ id })
    .update(changes)
    .then(() => {
      return findByID(id)
    })
}

// removes a user, returns amount deleted
function remove(id) {
  return db('user')
    .where({ id })
    .del();
}

module.exports = {
  getAll,
  getBy,
  add,
  update,
  remove
};