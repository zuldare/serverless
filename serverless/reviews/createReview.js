const uuid = require('uuid');
const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const tableReviews = 'reviews'
const tableBooks = 'books';

exports.handler = async (event, context, callback) => {
    let data = JSON.parse(event.body);
    const id = uuid.v1();

    let params2 = {
        TableName: tableBooks,
        Key: {
            "bookid": data.bookid
        }
    };
    let resBook = await docClient.get(params2).promise();
    if (resBook.Count === 0){
        sendResponse(404, 'Book ' + data.bookid + ' does not exists', callback);
    }

    const params = {
        TableName: tableReviews,
        Item: {
            "reviewid": id,
            "bookid": data.bookid,
            "reviewText": data.reviewText
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