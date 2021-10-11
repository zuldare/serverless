const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const table = 'authors'

exports.handler = async(event, context, callback) => {

    try {
        const params = {
            TableName: table,
            ProjectionExpression: "authorid, authorname, biography, birthYear"
        }
        const res = await docClient.scan(params).promise();
        sendResponse(200, res.Items, callback);
    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }

};
