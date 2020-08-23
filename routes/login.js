const express = require('express');
const toc = require('../services/tableOfContents.js');
const router = express.Router();
const cheerio = require('cheerio');
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://localhost:8000'
});
const docClient = new AWS.DynamoDB.DocumentClient();

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    const params = {
        TableName: 'Users',
        Key: { // a map of attribute name to AttributeValue for all primary key attributes

            email: email, //(string | number | boolean | null | Binary)
        // more attributes...
        },
    };
    docClient.get(params, (err, data) => {
        if (err) {
          console.log(err);
            res.status(500).send({ msg: 'Server Error' });
        } else{
            if(data.Item.password == password) res.sendStatus(200);
            else res.sendStatus(400);
        }
    });
});

router.post('/register', (req, res) => {
    const {email, password} = req.body;
    var params = {
        TableName: 'Users',
        Item: { // a map of attribute name to AttributeValue
            email: email,
            password: password
        },
        ConditionExpression: 'attribute_not_exists(email)'
    };
    docClient.put(params,(err, data) =>{
        if (err){
            res.status(500).send({ msg: 'Username has been taken' });
        } else {
            console.log(data);
            res.sendStatus(200);
        }
    });
});

router.all('*', (req, res) => {
    res.status(404).send({ msg: 'not found' });
});

module.exports = router;
