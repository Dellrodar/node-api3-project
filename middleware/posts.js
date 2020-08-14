const db = require('../posts/postDb');

const validatePost = () => {
    if (!req.body) {
      return res.status(400).json({ message: "missing post data" });
    }
    if (!req.body.text) {
      return res.status(400).json({ message: "missing required text field" });
    }
    return next();
  }
}

function validatePostId (req, res, next) {
postDb.getById(req.params.id)
  .then((posts)=> {
    if(posts){
      req.post = posts
      next()
    }
      return res.status(400).json({message: "Post not found."})
  })
  .catch((error)=>{
    next(error)
  })
}

module.exports = {
  validatePost,
  validatePostId
};