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
        let $ =  cheerio.load(resolved.data);
        $(".list-by-word-body").each((i, elem) => {
          $(elem).children().children().each((j, el) => {
            titles.push($(el).children('a').attr('href'))
          });
        });
      res.send(titles);
  })

});

router.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found' });
});

module.exports = router;
