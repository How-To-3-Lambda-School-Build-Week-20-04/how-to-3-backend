const db = require("../data/dbConfig.js");
const { findByID } = require("../howto/howto-model");

// return user's like on a post

// return all likes on a post
function getHowtoLikes(howtoId) {
  console.log(howtoId);
  return db("likes")
    .join("howto", "howto.id", "likes.howto_id")
    .where({ howto_id: howtoId });
}
// add a like to a post
function addLike(like) {
  console.log(like, "like from model");
  return db("likes")
    .insert(like, "id")
    .then(([id]) => {
      console.log(id, "id from model");
      return db("likes").where({ id });
    });
}

// remove a like from a post

module.exports = { addLike, getHowtoLikes };
