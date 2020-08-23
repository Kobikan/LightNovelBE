const express = require('express');
const toc = require('../services/tableOfContents.js')
const router = express.Router();
const cheerio = require('cheerio');
const _ = require('lodash');
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://localhost:8000'
});
const docClient = new AWS.DynamoDB.DocumentClient();

router.get('/sites', (req, res) => {

});

router.get('/books/rln', (req, res) => {
  const params = {
      TableName: 'Novels',
      Select: 'ALL_ATTRIBUTES',
  };
  docClient.scan(params, (err, data)=>{
    if (err) res.status(404).send({ msg: 'not found' });
    else {
      res.json(data.Items)
    }
  });
});

router.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found' });
});

module.exports = router;
