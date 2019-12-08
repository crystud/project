export default (roles) => (req, res, next) => {
  const allowed = roles.some((role) => req.user.roles.includes(role))

  if (!allowed) {
    return res.json({
      errors: [{
        msg: `Access denied for user ${req.user.userID}`,
        param: 'token',
        location: 'header',
      }],
    })
  }

  return next()
}
