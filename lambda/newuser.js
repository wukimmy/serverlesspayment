var AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();

exports.handler = function (event, context) {
    console.log( event.response.userName)
    var params = {
        Item: {
            "acc": {
                S: event.response.userName
            },
            "amount": {
                N: '0'
            }
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: "serverlesspayment"
    };
    dynamodb.putItem(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
}
