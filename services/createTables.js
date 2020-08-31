const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://localhost:8000'
});
const dynamodb = new AWS.DynamoDB();
const createTable = {
    user: () =>{
        const userTable = {
            TableName : 'Users',
            KeySchema: [
                { AttributeName: 'email', KeyType: 'HASH'},

            ],
            AttributeDefinitions: [
                { AttributeName: 'email', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };
        dynamodb.createTable(userTable, (err, data) => {
            if (err) {
                console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
            }
        });

    },
    novels: () =>{
        const novelTabel = {
            TableName : 'Novels',
            KeySchema: [
                { AttributeName: 'name', KeyType: 'HASH'},

            ],
            AttributeDefinitions: [
                { AttributeName: 'name', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };
        dynamodb.createTable(novelTabel, (err, data) => {
            if (err) {
                console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
            }
        });

    },
};

module.exports = createTable;
