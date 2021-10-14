const uuid = require('uuid');
const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const table = 'authors'

exports.handler = async (event, context, callback) => {

    try{
        const params = {
            TableName: table,
            Key: {
                "authorid": event.pathParameters.id
            },
            ReturnValues: "ALL_OLD"
        };

        const resAuthor = await docClient.get(params).promise();

        if (resAuthor.Item === undefined){
            sendResponse(200, null, callback);
        } else {
            const res = await docClient.delete(params).promise();
            sendResponse(200, resAuthor.Item, callback);
        }

    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }
};