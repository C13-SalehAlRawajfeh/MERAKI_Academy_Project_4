const authorization = (perm) => {
  return (req, res, next) => {
    console.log(',req.token.role.permissions[perm].includes(req.method)', req.token.role.permissions[perm].includes(req.method))
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
