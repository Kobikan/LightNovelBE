const express = require('express');
const read = require('../services/read.js')
const router = express.Router();
const cheerio = require('cheerio');
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});
const doc = new AWS.DynamoDB.DocumentClient();

router.get('/rln/', (req, res) => {
  read.decode()
  .then(resolve => {
    let $ =  cheerio.load(resolve.data);
    let chapter = $(".chapter-content3").contents().text()
    let modChapter = chapter.replace(/\s\s/g, '\n\n').split("Chapter")
    res.send(modChapter[2])
  })
});

router.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found' });
});

module.exports = router;
