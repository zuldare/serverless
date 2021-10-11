const uuid = require('uuid');
const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const table = 'books'


exports.handler = async (event, context, callback) => {
    let data = JSON.parse(event.body);
    const id = uuid.v1();

    const params = {
        TableName: table,
        Item: {
            "bookid": id,
            "title": data.title,
            "summary": data.summary,
            "publisher": data.publisher,
            "publishYear": data.publishYear,
            "authorid": data.authorid
        }
    }

    try {
        const res = await docClient.put(params).promise();
        res.id = id
        sendResponse(200, res, callback);
    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }
};