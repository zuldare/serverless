const uuid = require('uuid');
const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const tableBooks = 'books'
const tableAuthors = 'authors'

exports.handler = async (event, context, callback) => {
    try {
        let data = JSON.parse(event.body);
        const id = uuid.v1();

        let params = {
            TableName: tableAuthors,
            Key: {
                "authorid": data.authorid
            }
        }
        const responseAuthors = await docClient.get(params).promise();

        if (responseAuthors.Item === undefined) {
            sendResponse(404, 'Author ' + data.authorid + ' not found', callback);
        } else {
            params = {
                TableName: tableBooks,
                Item: {
                    "bookid": id,
                    "title": data.title,
                    "summary": data.summary,
                    "publisher": data.publisher,
                    "publishYear": data.publishYear,
                    "authorid": data.authorid
                }
            }

            const res = await docClient.put(params).promise();
            res.id = id
            sendResponse(200, res, callback);
        }
    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }
};