
const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const tableReviews = 'reviews';

exports.handler = async (event, context, callback) => {

    try{
        const params = {
            TableName: tableReviews,
            Key: {
                "reviewid": event.pathParameters.id
            }
        };

        const resReview = await docClient.get(params).promise();

        if (resReview.Count !== 0){
            const res = await docClient.delete(params).promise();
            sendResponse(200, resReview.Item.reviewid, callback);
        } else {
            sendResponse(404, 'Not found', callback);
        }

    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }
};
