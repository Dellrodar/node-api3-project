const express = require('express');
const db = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, async (req, res, next) => {
  try {
    const user = await db.insert(req.body)
		res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
	try {
		req.body.user_id = req.params.id;
		await db.insert(req.body);
		res.status(201).json(post);
	} catch (err) {
		next(err);
	}
});

router.get('/', async (req, res, next) => {
  try {
    const users = await db.get(req.query)
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateUserId, async (req, res, next) => {
	try {
    const user = await db.getById(req.params.id)
    res.status(200).json(user);
    } catch (err) {
      next(err)
    }
  });

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const posts = await db.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
	try {
    const user = await db.remove(req.params.id);
    res.status(200).json({ message: 'The user has been removed.' });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
	try {
    const user = await db.update(req.params.id, req.body)
    res.status(201).json({ message: 'User updated successfully', user });
  } catch(err) {
    next(err);
  }
});

//custom middleware

function validateUserId(req, res, next) {
	db.getById(req.params.id)
		.then((user) => {
			if (user) {
				req.user = user;
				next();
      }
      return res.status(400).json({ message: 'invalid user id' });
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).json({
				error: 'There was a problem pulling the data from the server',
			});
		});
}

function validateUser(req, res, next) {
	if (!req.body) {
		return res.status(400).json({ message: 'missing user data' });
	}
	if (!req.body.name) {
		return res.status(400).json({ message: 'missing required name field' });
	}
	next();
}

function validatePost(req, res, next) {
	if (!req.body) {
		return res.status(400).json({ message: 'missing post data' });
	}
	if (!req.body.text) {
		return res.status(400).json({ message: 'missing required text field' });
	}
	next();
}

module.exports = router;
