const db = require("../data/dbConfig.js");
const { findByID } = require("../howto/howto-model");

// return user's like on a post
function getUserLikes(userId) {
  console.log(userId);
  return db("likes")
    .join("user", "user.id", "likes.user_id")
    .where({ user_id: userId })
    .select("likes.id", "likes.user_id", "likes.howto_id");
}

// return all likes on a post
function getHowtoLikes(howtoId) {
  console.log(howtoId);
  return db("likes")
    .join("howto", "howto.id", "likes.howto_id")
    .where({ howto_id: howtoId })
    .select("likes.id", "likes.user_id", "likes.howto_id");
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
function deleteLike(id) {
  return db("likes").where({ user_id: id }).del();
}

module.exports = { addLike, getHowtoLikes, getUserLikes, deleteLike };
