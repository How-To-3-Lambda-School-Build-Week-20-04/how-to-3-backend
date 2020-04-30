require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  let user = req.body;

  const rounds = /*process.env.ROUNDS ||*/ 12;

  user.password = bcrypt.hashSync(user.password, rounds);

  Users.add(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.getBy({ username })
    .then(([foundUser]) => {
      if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
        const token = genToken(foundUser);

        res.status(200).json({ message: "Welcome Home", token });
      } else {
        res.status(401).json({ error: "Bad login information" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

function genToken(user) {
  if (
    !user ||
    typeof user.id === "undefined" ||
    typeof user.username === "undefined"
  ) {
    new error("username and id needed");
  }
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = process.env.TOKEN_SECRET;
  const options = {
    expiresIn: process.env.TOKEN_LIFE || "12h",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
