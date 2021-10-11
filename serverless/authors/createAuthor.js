const uuid = require('uuid');
const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const table = 'authors'

exports.handler = async (event, context, callback) => {
    let data = JSON.parse(event.body);

    console.log('Data : ' + data.toString());
    const id = uuid.v1();

    const params = {
        TableName: table,
        Item: {
            "authorid": id,
            "name": data.name,
            "biography": data.biography,
            "birthYear": data.birthYear
        }
    }

    try {
        console.log('Before ');
        const res = await docClient.put(params).promise();
        res.id = id
        sendResponse(200, res, callback);
    } catch (err) {
        sendResponse(500, err, callback);
        return err;
    }

}

    // try {
    //     response = {
    //         'statusCode': 200,
    //         'body': JSON.stringify({
    //             message: 'post Author ' + data.name + '  ' +  event.body.toString()
    //             // location: ret.data.trim()
    //         })
    //     }
    // }  catch (err) {
    //     console.log(err);
    //     return err;
    // }
    //
    // return response
    // };