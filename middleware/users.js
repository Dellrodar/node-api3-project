const users = require('../users/userDb.js');

const validateUserId = () => {
  return (req, res, next) => {
    users.getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        return next();
      }
         return res.status(400).json({ message: "invalid user id" })
    })
    .catch((error) => {
      console.log(error);
      return res.status(500);
    })
  }
}

const validateUser = () => {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({ message: "missing post data" })
    }
    if (!req.body.text) {
      res.status(400).json({ message: "missing required text field" })
    }
    return next();
  }
}

module.export = {
  validateUserId,
  validateUser
}