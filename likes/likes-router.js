const router = require("express").Router();
const Likes = require("./likes-model.js");
const { validateUser } = require("./likes-middleware");

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

router.get("/userLikes/:id", (req, res) => {
  const userId = req.params.id;
  Likes.getUserLikes(userId)
    .then((data) => {
      console.log(data, "user id data from get user likes route");
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "server error" });
    });
});

router.delete("/:id", validateUser, (req, res) => {
  const userId = req.params.id;
  console.log(req.body, "from del");
  console.log(req.params);
  Likes.deleteLike(userId)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
});

module.exports = router;
