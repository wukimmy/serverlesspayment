var AWS = require("aws-sdk");
let resp

exports.handler =  function(event, context) {
    var fromAmount = event.body.fromAmount - event.body.amount;
    var toAmount = parseFloat(event.body.toAmount) + parseFloat(event.body.amount) ;
    const params = {
        TransactItems: [{
            Put: {
                TableName : '[tableName]',
                Item: {
                    acc: event.body.from,
                    amount: fromAmount
                }
            }
        }, {
            Put: {
                TableName : '[tableName]',
                Item: {
                    acc: event.body.to,
                    amount: toAmount
                }
            }
        }, {
            Put: {
                TableName : '[tableName]',
                Item: {
                    acc: event.body.from + event.body.to + '#' + Date.now().toString(),
                    from: event.body.from,
                    to: event.body.to,
                    amount: event.body.amount
                }
            }
        }]
    };
    
    const documentClient = new AWS.DynamoDB.DocumentClient();

    documentClient.transactWrite(params, function(err, data) {
        if (err) {
            console.log(err);
            return err;
            }
            
        else{
            console.log(data);  
            return data;
        } 
    });
    console.log("EVENT: \n" + JSON.stringify('ended execution', null, 2))
    return context.logStreamName
}
