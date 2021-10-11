const uuid = require('uuid');
const aws = require('aws-sdk');

const docClient = new aws.DynamoDB.DocumentClient();

module.exports = { uuid, aws, docClient};