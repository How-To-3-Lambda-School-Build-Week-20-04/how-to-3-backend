const router = require('express').Router();

// TO-DO
// add routers
const authRouter = require('../auth/auth-router')
const usersRouter = require("../users/users-router");
const authMiddleware = require ('../auth/authenticator')


router.use('/auth', authRouter);
router.use("/users", authMiddleware, usersRouter);

module.exports = router;