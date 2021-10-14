const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: 'http://172.17.0.1:8000'  // https://dynamodb.us-east-1.amazonaws.com
});

// aws.config.update({
//     credentials: {
//         accessKeyId: "AKIATVPE3RD3RXQAXYKF",
//         secretAccessKey: "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",
//     },
//     region: "us-east-1"
// });

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = { docClient }