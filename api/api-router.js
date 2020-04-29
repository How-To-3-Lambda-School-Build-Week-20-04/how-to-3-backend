const router = require("express").Router();

const authRouter = require("../auth/auth-router");
const howtoRouter = require("../howto/howto-router");
const catRouter = require('../category/category-router');
const userRouter = require("../users/users-router");
const { restricted } = require("../auth/auth-helpers");
const likesRouter = require("../likes/likes-router");

router.use("/auth", authRouter);
router.use("/howto", restricted, howtoRouter);
router.use("/user", userRouter);
router.use("/likes", likesRouter);
router.use('/categories', restricted, catRouter);


module.exports = router;
