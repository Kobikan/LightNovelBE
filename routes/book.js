const express = require('express');
const read = require('../services/read.js')
const cheerio = require('cheerio');
const _ = require('lodash');
const router = express.Router();
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://localhost:8000'
});
const docClient = new AWS.DynamoDB.DocumentClient();

router.post('/chapter', (req, res) => {
  const params = {
    TableName: "Novels",
    FilterExpression: "suffix = :suf",
    ExpressionAttributeValues: {":suf":req.body.suffix}
};
docClient.scan(params, function(err, data){
    if (err || _.isEmpty(data.Items)){
      res.status(404).send({ msg: 'not found' });
    } else {
      read.chapter(data.Items[0].link, req.body.chapterNumber)
      .then(resolve => {
        let $ =  cheerio.load(resolve.data);
        let chapter = $(".chapter-content3").contents().text()
        let modChapter = chapter.replace(/\s\s/g, '\n\n').split(`Chapter ${req.body.chapterNumber}`)
        res.send(modChapter[2].split('\n'))
      })
    }
});
});
router.post('/toc', (req, res) => {
  const params = {
    TableName: "Novels",
    FilterExpression: "suffix = :suf",
    ExpressionAttributeValues: {":suf":req.body.suffix}
};
docClient.scan(params, function(err, data){
  console.log(params)
    if (err || _.isEmpty(data.Items)){
      res.status(404).send({ msg: 'not found' });
    } else {
      read.toc(data.Items[0].link)
      .then(resolve => {
        let $ =  cheerio.load(resolve.data);
        let chapter = $(".chapter-chs").contents().text().split("CH").map(x => +x)
        while(chapter[0] == 0) chapter.shift()
        res.status(200).send({
          name: data.Items[0].name,
          link: data.Items[0].link,
          chapters: chapter
        })
      })
    }
});
});

router.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found' });
});

module.exports = router;
