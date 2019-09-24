var AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();

exports.handler = async event => {
   var sub =  event.response.userName;
    var params = {
        Item: {
           "acc": {
             S: sub
            }, 
           "amount": {
             N: "0"
            }
        }, 
        ReturnConsumedCapacity: "TOTAL", 
        TableName: "serverlesspayment"
    };
    dynamodb.putItem(params, function(err, data) {
        if (err) console.log(err, err.stack); 
        else     console.log(data);           
       
    });
};