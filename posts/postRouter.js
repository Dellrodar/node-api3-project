const express = require('express');
const db = require('./postDb');
const { validatePost, validatePostId } = require('../middleware/posts');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const posts = await db.find();
		res.status(200).json(posts);
	} catch (err) {
		return next(err);
	}
});

router.get('/:id', validatePostId, async (req, res, next) => {
  try {
    const posts = await db.getById(req.params.id);
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', validatePostId, async (req, res, next) => {
  try {
    const posts = await db.remove(req.params.id);
    return res.status(201).json(posts);
  } catch (err) {
    return next(err);
  }
});

router.put('/:id', validatePost(), validatePostId, async (req, res, next) => {
  try {
      const post = await db.update(req.params.id, req.body)
      const text = req.body.text
      res.status(201).json({message: "Post was updated successfully", post, text })
  } catch (err) {
    return next(err)
  }
});

module.exports = router;
