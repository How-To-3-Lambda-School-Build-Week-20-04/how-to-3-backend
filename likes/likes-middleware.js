function validateUser(req, res, next) {
  const param = parseInt(req.params.id);
  param !== req.body.user_id
    ? res.status(400).json({ message: "User does not match user of likes" })
    : next();
}
module.exports = { validateUser };
