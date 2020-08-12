const express = require('express');
const {validateUserId, validateUser} = require('../middleware/users');
const {validatePost} = require('../middleware/posts');

const router = express.Router();

router.post('/', (req, res) => {
  return res.status(200);
});

router.post('/:id/posts',  (req, res) => {

});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
