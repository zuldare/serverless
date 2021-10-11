const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const table = 'authors'

exports.handler = async (event, context, callback) => {

   try{
       const params = {
           TableName: table,
           Key: {
               "authorid": event.pathParameters.id
           }
       };
       const res = await docClient.get(params).promise();
       sendResponse(200, res.Item, callback);
   } catch (err) {
       sendResponse(500, err, callback);
       return err;
   }


    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'get Author by id ' + event.pathParameters.id,
                // location: ret.data.trim()
            })
        }
    }  catch (err) {
        console.log(err);
        return err;
    }

    return response
};