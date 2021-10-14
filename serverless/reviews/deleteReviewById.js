
const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const tableReviews = 'reviews';

exports.handler = async (event, context, callback) => {

    try{
        let reviewid = event.pathParameters.id;
        const params = {
            TableName: tableReviews,
            Key: {
                "reviewid": reviewid
            },
            ReturnValues: "ALL_OLD"
        };

        const resReview = await docClient.get(params).promise();

        if (resReview.Item === undefined){
            sendResponse(404, 'Review ' + reviewid +'not found', callback);
        } else {
            const res = await docClient.delete(params).promise();
            sendResponse(200, resReview.Item, callback);
        }

    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }
};
