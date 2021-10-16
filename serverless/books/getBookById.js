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
        const resBooks = await docClient.get(params).promise();

        if (resBooks.Item === undefined){
            sendResponse(404, 'Book ' + bookId + ' not found', callback);
        }

        // Authors
        params = {
            TableName: tableAuthors,
            Key: {
                "authorid": resBooks.Item.authorid
            }
        };
       const resAuthor = await docClient.get(params).promise();

       // Reviews
       // params = {
       //     TableName: tableReviews,
       //     ConditionExpression: '#a = :BOOKID',
       //     ExpressionAttributeNames: {'#a' : 'bookid' },
       //     ExpressionAttributeValues: {
       //         ":BOOKID": event.pathParameters.id
       //     }
       //
       // }
       // const resReview = await docClient.scan(params).promise();

       const newResponse = {
           book: resBooks.Item,
           author: resAuthor.Item,
           // reviews: resReview.Items
           reviews: []
       };

        sendResponse(200, newResponse, callback);
    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }
};