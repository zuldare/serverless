
const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const tableReviews = 'books';

exports.handler = async (event, context, callback) => {

    try{
        let bookid = event.pathParameters.id;
        let params = {
            TableName: tableReviews,
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
            //     Key: {
            //         "bookid": res.Item.bookId,
            //     },
            //
            // };

            params = {
                TableName: tableReviews,
                ProjectionExpression: "bookid"
            }


            const resReview = await docClient.get(params).promise();

            for (let review of resReview.Item){
                await docClient.delete(params).promise();
            }


            const res = await docClient.delete(params).promise();

            sendResponse(200, resBook.Item, callback);
        }

    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }
};
