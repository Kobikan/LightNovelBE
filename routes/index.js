const express = require('express');
const router = express.Router();

const list = require('./list');
const book = require('./book');

router.get('/', (req, res) => {
  res.send(`Backend is running fine you dumbfuck`);
});

router.use('/book', book);
router.use('./list', list)
router.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found' });
});

module.exports = router;
