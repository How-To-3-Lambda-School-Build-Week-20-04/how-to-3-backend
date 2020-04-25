const db = require('../data/dbConfig.js');

function getBy(filter) {
  return db('howto')
    .where(filter)
}

async function add(howto) {

}

module.exports = {
  getBy,
  add
};