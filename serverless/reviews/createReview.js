const uuid = require('uuid');
const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const tableReviews = 'reviews'
const tableBooks = 'books';

exports.handler = async (event, context, callback) => {
    let data = JSON.parse(event.body);
    const id = uuid.v1();

    if (await bookExists(data.bookid)){
        const params = {
            TableName: tableReviews,
            Item: {
                "reviewid": id,
                "review_text": data.reviewText
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
    }
    sendResponse(500, 'Book ' + data.bookid + ' does not exists', callback);
};


async function bookExists(bookid){
    const bookId = bookid;
    let params2 = {
        TableName: tableBooks,
        Key: {
            "bookid": bookId
        }
    };
    let res = await docClient.get(params2).promise();

    return (res.Count !== 0);
}