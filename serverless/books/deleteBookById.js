
const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const tableReviews = 'books';

exports.handler = async (event, context, callback) => {

    try{
        let params = {
            TableName: tableReviews,
            Key: {
                "bookid": event.pathParameters.id
            }
        };

        const resBook = await docClient.get(params).promise();

        if (resBook.Count !== 0){

            // Review
            params = {
                TableName: tableReviews,
                Key: {
                    "bookid": res.Item.bookId,
                }
            };
            const resReview = await docClient.get(params).promise();

            for (let review of resReview.Item){
                await docClient.delete(params).promise();
            }


            const res = await docClient.delete(params).promise();

            sendResponse(200, resBook.Item.bookid, callback);
        } else {
            sendResponse(404, 'Not found', callback);
        }

    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }
};
