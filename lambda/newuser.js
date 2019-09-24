var AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();


exports.handler = function (event, context) {
    const response;
    console.log(event.response.userName)
    var params = {
        Item: {
            "acc": {
                S: event.response.userName
            },
            "amount": {
                N: '0'
            }
        },
        TableName: "serverlesspayment"
    };
    try {
        dynamodb.putItem(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
        });
        response = {
            statusCode: 200,
            body: JSON.stringify('New account created!'),
        };
    }catch(err){
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        response = {
            statusCode: 500,
            body: JSON.stringify('Something went wrong when creating your account'),
        };
        throw err;
    }
    return response
}
