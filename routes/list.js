const express = require('express');
const toc = require('../services/tableOfContents.js')
const router = express.Router();
const cheerio = require('cheerio');
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});
const doc = new AWS.DynamoDB.DocumentClient();

router.get('/sites', (req, res) => {

});

router.get('/books/rln', (req, res) => {
  const letters = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const titles = [];
    toc.books()
      .then(resolved => {
        letters.split("").forEach( letter => {
          let $ =  cheerio.load(resolved.data);
          let names = $(`.letter_${letter}`).contents().text()
          titles.push(names);
      })
      console.log(titles)
      res.send("ds");
  })

});

router.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found' });
});

module.exports = router;
