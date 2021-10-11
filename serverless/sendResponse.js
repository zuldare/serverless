const sendResponse = (statusCode, message, callback) => {
    const res = {
        statusCode: statusCode,
        body: JSON.stringify(message)
    };

    callback(null, res);
};

module.exports = { sendResponse }