const express = require('express');
const db = require('./postDb');

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

router.put('/:id', validatePostId, async (req, res, next) => {
	try {
		const post = await db.update(req.params.id, req.body);
		const text = req.body.text;
		res
			.status(201)
			.json({ message: 'Post was updated successfully', post, text });
	} catch (err) {
		return next(err);
	}
});

//middleware
function validatePostId(req, res, next) {
	db.getById(req.params.id)
		.then((posts) => {
			if (posts) {
				req.post = posts;
				next();
			}
			res.status(400).json({ message: 'invalid post id' });
		})
		.catch((error) => {
			next(error);
		});
}
module.exports = router;
