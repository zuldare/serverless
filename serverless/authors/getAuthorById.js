const { docClient } = require('../configuration/dbConnection');
const { sendResponse } = require('../sendResponse');
const tableAuthors = 'authors'
const tableBooks = 'books'

exports.handler = async (event, context, callback) => {

   try{
       let params = {
           TableName: tableAuthors,
           Key: {
               "authorid": event.pathParameters.id
           }
       };
       const res = await docClient.get(params).promise();


       params = {
           TableName: tableBooks,
           ProjectionExpression: "authorid"
       }
       const resBook = await docClient.scan(params).promise();

       const newResponse = {
           author: res.Item,
           books: resBook.Items
       };

       sendResponse(200, newResponse, callback);
   } catch (err) {
       sendResponse(500, err, callback);
       return err;
   }

};