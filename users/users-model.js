const db = require('../data/dbConfig.js');

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

// returns a user's posts by their id
function getUserPosts(user_id) {
  return db('howto as h')
    .join('user as u', 'h.user_id', 'u.id')
    .where({user_id})
    .select('u.id as user_id', 'h.id as howto_id', 'u.username', 'h.title', 'h.post', 'h.created_at')
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
  getUserPosts,
  add,
  update,
  remove
};