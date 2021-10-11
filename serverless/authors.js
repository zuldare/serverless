let response;

exports.getAuthors = async(event, context, callback) => {
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'get Authors',
                // location: ret.data.trim()
            })
        }
    }  catch (err) {
        console.log(err);
        return err;
    }

    return response
};


exports.getAuthorById = async (event, context, callback) => {
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