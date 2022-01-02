const { clearHash } = require("../utils/Cache");

module.exports = async (req, res, next) => {
  await next();

  clearHash(req.user.id);
};
