
const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const tableBooks = 'books';
const tableReviews = 'reviews';

exports.handler = async (event, context, callback) => {

    try{
        let bookid = event.pathParameters.id;
        let params = {
            TableName: tableBooks,
            Key: {
                "bookid": bookid
            },
            ReturnValues: "ALL_OLD"
        };

        const resBook = await docClient.get(params).promise();

        if (resBook.Item === undefined) {
            sendResponse(404, 'Book, Not found', callback);
        } else {
            // Review

            // params = {
            //     TableName: tableReviews,
            //     ConditionExpression: '#a = :BOOKID',
            //     ExpressionAttributeNames: {'#a' : 'bookid' },
            //     ExpressionAttributeValues: {
            //         ":BOOKID": event.pathParameters.id
            //     }
            //
            // }
            // const resReview = await docClient.delete(params).promise();


            const res = await docClient.delete(params).promise();

            sendResponse(200, resBook.Item, callback);


        }

    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }
};
