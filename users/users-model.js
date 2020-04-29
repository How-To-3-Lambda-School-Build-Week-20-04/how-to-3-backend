const db = require('../data/dbConfig.js');
const Howto = require('../howto/howto-model')

// this file is used by auth-router

// returns all users
function getAll() {
  return db('user')
  .select('id', 'username', 'email')
}

// this is used in auth-router MUST RETURN PASSWORD
function getBy(filter) {
  return db('user')
    .where(filter)
}

async function getByUName(username) {
  return db('user')
    .where(username)
    .select('id', 'username', 'email')
}

// returns a single user by their id
function getByID(id) {
  return db('user')
    .where({id})
    .select('id', 'username', 'email')
}

// this is also used in auth-router
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
  getByUName,
  getByID,
  add,
  update,
  remove
};