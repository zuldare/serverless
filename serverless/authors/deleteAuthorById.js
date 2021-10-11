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
            }
        };

        const resAuthor = await docClient.scan(params).promise();

        if (resAuthor.Count !== 0){
            const res = await docClient.delete(params).promise();
            sendResponse(200, resAuthor.Item.authorid, callback);
        } else {
            sendResponse(200, null, callback);
        }

    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }
};