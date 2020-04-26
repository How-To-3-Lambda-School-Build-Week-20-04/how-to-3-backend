const router = require('express').Router();

const authRouter = require('../auth/auth-router')
const howtoRouter = require('../howto/howto-router')
const { restricted } = require ('../auth/auth-helpers')

router.use('/auth', authRouter);
router.use('/howto', restricted, howtoRouter);

module.exports = router;