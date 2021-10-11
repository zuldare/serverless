const uuid = require('uuid');
const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const table = 'books'

exports.handler = async (event, context, callback) => {
    try {
        const params = {
            TableName: table,
            ProjectionExpression: "bookid, title"
        }
        const res = await docClient.scan(params).promise();
        sendResponse(200, res.Items, callback);
    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }
};