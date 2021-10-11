let response;

exports.handler = async (event, context, callback) => {
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'get book s '
                // location: ret.data.trim()
            })
        }
    }  catch (err) {
        console.log(err);
        return err;
    }

    return response
};