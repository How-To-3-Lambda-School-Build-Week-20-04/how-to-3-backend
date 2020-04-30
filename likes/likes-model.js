const db = require("../data/dbConfig.js");
const { findByID } = require("../howto/howto-model");

// return user's like on a post

// return all likes on a post
function getHowtoLikes(howtoId) {
  return db("likes")
    .join("howto", "howto.id", "likes.howto_id")
    .where({ howto_id: howtoId })
    .select("likes.id", "likes.user_id", "likes.howto_id");
}
// add a like to a post
function addLike(like) {
  return db("likes")
    .insert(like, "id")
    .then(([id]) => {
      return db("likes").where({ id });
    });
}

// remove a like from a post

module.exports = { addLike, getHowtoLikes };
