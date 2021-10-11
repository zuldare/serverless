const aws = require('aws-sdk')

const dbOptions = {
    region: process.env.REGION || "us-east-1",
    endpoint: process.env.ENDPOINT || 'http://172.17.0.1:8000',
}

const docClient = new aws.DynamoDB.DocumentClient(dbOptions);

module.exports = { docClient }