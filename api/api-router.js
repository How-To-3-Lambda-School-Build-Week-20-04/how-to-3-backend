const router = require('express').Router();

const authRouter = require('../auth/auth-router')
const catRouter = require('../category/category-router');
const howtoRouter = require('../howto/howto-router')
const userRouter = require('../users/users-router')

const { restricted } = require ('../auth/auth-helpers')

router.use('/auth', authRouter);
router.use('/categories', restricted, catRouter);
router.use('/howto', restricted, howtoRouter);
router.use('/user', userRouter)

module.exports = router;