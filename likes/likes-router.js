const router = require("express").Router();
const Likes = require("./likes-model.js");

router.get("/", async (req, res) => {
  res.json({ message: "likes router here" });
});

router.post("/", (req, res) => {
  const likeData = req.body;
  console.log(likeData, "likeData req from post");
  Likes.addLike(likeData)
    .then((data) => {
      console.log(data, "data from add promise");
      !data
        ? res.status(400).json({ message: "improper request" })
        : res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
