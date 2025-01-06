const authorization = (perm) => {
  return (req, res, next) => {
    if (!req.token.role.permissions[perm].includes(req.method)) {
      return res.status(403).json({
        success: false,
        message: `Unauthorized`,
      });
    }
    next();
  };
};

module.exports = authorization;
