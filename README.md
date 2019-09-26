# serverlesspayment
One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

For the project to work, you will need to have an AWS account, and create:

- [Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/tutorial-create-user-pool.html)
- [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-create-api.html)
- [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/getting-started-create-function.html)
- [Dynamo DB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SampleData.CreateTables.html)

```
Each lambda code is place in the folder lambda
```

### Installing

To run local:
Install dependencies

```
npm install
```
Run the task manager
```
grunt
```

## Built With

* [AWS SDK for JavaScript](https://github.com/aws/aws-sdk-js) - AWS SDK to connect with cloud
* [Amazon cognito auth](https://github.com/aws/amazon-cognito-auth-js) - Cognito SDK for authentication
* [Amazon cognito](https://github.com/aws/amazon-cognito-js) - Cognito JS SDK
* [JQuery QR Code](https://github.com/jeromeetienne/jquery-qrcode) - Used to create user QRCode
* [Google fonts](https://developers.google.com/fonts/docs/getting_started) - Used as font extention
* [JQuery](https://api.jquery.com/jquery.ajax/) - Used to make http requests
* [Grunt](https://gruntjs.com/) - JS task runner
* [Browser sync](https://www.browsersync.io/) - live reloading mock
* [NodeJs](https://nodejs.org) - JavaScript run-time environment that executes JavaScript code outside of a browser.
* [NPM](https://www.npmjs.com) - package manager for the JavaScript

## Contributing

Feel free to fork the repository and contribute

## Versioning
0.0