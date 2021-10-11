const uuid = require('uuid');

let response;

exports.handler = async (event, context, callback) => {

    let data = JSON.parse(event.body);
    const id = uuid

    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'post Author ' + data.name + '  ' +  event.body.toString()
                // location: ret.data.trim()
            })
        }
    }  catch (err) {
        console.log(err);
        return err;
    }

    return response
};