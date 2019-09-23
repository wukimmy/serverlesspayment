import json
import boto3
import os
from boto3.dynamodb.conditions import Key

def getBalance(acc):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('serverlesspayment')
    print('starte quey with acc: ' + acc)
    response = table.query(
        KeyConditionExpression=Key('acc').eq(acc)
    )
    items = response['Items']
    for item in items:
        contentlist ={
            'acc' : item['acc'],
            "amount" : str(item['amount'])
        }
    return contentlist
    
def lambda_handler(event, context):
    message= ""
    acc = event['queryStringParameters']['acc']
    resp = getBalance(acc)
    if resp is None:
        message += "We didn't find anything on the db"
        httpStatusCode = "500"
    else:
        message += "Here's what we got: "
        httpStatusCode = "200"

    jsonReturn = {
        "isBase64Encoded": True,
        "statusCode": httpStatusCode,
        "multiValueHeaders": {},
        "body": json.dumps(resp)
    }
    print(message)
    return jsonReturn
