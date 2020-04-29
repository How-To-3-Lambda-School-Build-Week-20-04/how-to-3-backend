const router = require("express").Router();
const Likes = require("./likes-model.js");

router.get("/:id", (req, res) => {
  const howtoId = req.params.id;
  Likes.getHowtoLikes(howtoId)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "server error" });
    });
});

router.post("/", (req, res) => {
  const likeData = req.body;
  Likes.addLike(likeData)
    .then((data) => {
      !data
        ? res.status(400).json({ message: "improper request" })
        : res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
