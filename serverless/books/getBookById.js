const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const tableBooks = 'books';
const tableAuthors = 'authors';
const tableReviews = 'reviews';

exports.handler = async (event, context, callback) => {
    try{
        const bookId = event.pathParameters.id;
        let params = {
            TableName: tableBooks,
            Key: {
                "bookid": bookId
            }
        };
        const res = await docClient.get(params).promise();

        // Authors
        params = {
            TableName: tableAuthors,
            Key: {
                "authorid": res.Item.authorid,

            }
        };
        const resAuthor = await docClient.get(params).promise();

        // Review
        params = {
            TableName: tableReviews,
            Key: {
                "bookid": res.Item.bookId,
            }
        };
       const resReview = await docClient.get(params).promise();


       const newResponse = {
           book: res.Item,
           author: resAuthor.Item,
           reviews: resReview.Item
       };

        sendResponse(200, newResponse, callback);
    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }
};