require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { genToken, bodyCheck } = require('./auth-helpers')

const Users = require("../users/users-model");

router.post("/register", bodyCheck, (req, res) => {
  let user = req.body;

  const rounds = /*process.env.ROUNDS ||*/ 12;

  user.password = bcrypt.hashSync(user.password, rounds);

  Users.add(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ error: "Could not register user to database.", error });
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
        res.status(400).json({ error: "Bad login information" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Unable to log in.", error });
    });
});

module.exports = router;
