const cron = require('node-cron')
const toc = require('../services/tableOfContents.js')
const cheerio = require('cheerio');
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});
const docClient = new AWS.DynamoDB.DocumentClient();

const tasks = {
  novels: () =>{
    cron.schedule('20 13 * * *', () => {
      const letters = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const titles = [];
      console.log("Start Update")
        toc.rln()
          .then(resolved => {
            let $ =  cheerio.load(resolved.data);
            $(".list-by-word-body").each((i, elem) => {
              $(elem).children().children().each((j, el) => {
                const params = {
                    TableName: 'Novels',
                    Item: { // a map of attribute name to AttributeValue
                        name: $(el).children('a').text(),
                        link: $(el).children('a').attr('href'),
                        suffix: $(el).children('a').attr('href').replace('https://www.readlightnovel.org/','')
                    },
                    ConditionExpression: 'attribute_not_exists(email)'
                };
                docClient.put(params,(err, data) =>{
                    if (err){
                        console.log({ msg: 'Username has been taken' });
                    }
                });
              });
            });
      })
    });
  },
  categories: () =>{
    cron.schedule('0 1 * * *', () => {
      const letters = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const titles = [];
      console.log("Start Update")
        toc.rln()
          .then(resolved => {
            let $ =  cheerio.load(resolved.data);
            $(".list-by-word-body").each((i, elem) => {
              $(elem).children().children().each((j, el) => {
                const params = {
                    TableName: 'Novels',
                    Item: { // a map of attribute name to AttributeValue
                        name: $(el).children('a').text(),
                        link: $(el).children('a').attr('href'),
                        site: "Read Light Novels"
                    },
                    ConditionExpression: 'attribute_not_exists(email)'
                };
                docClient.put(params,(err, data) =>{
                    if (err){
                        console.log({ msg: 'Username has been taken' });
                    }else {
                      console.log(data)
                    }
                });
              });
            });
      })
    });
  }
}
module.exports = tasks;
