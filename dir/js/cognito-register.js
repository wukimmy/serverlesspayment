function signUp() {
  var node = document.createElement("P");
  var textnode = document.createTextNode("Check your email to confirm the account");
  node.appendChild(textnode);
  document.getElementById("information").appendChild(node);
  var poolData = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.clientId
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var attributeList = [];
  personalname = document.getElementById("nameInputRegister").value;
  date = document.getElementById("brithDayRegister").value;
  username = document.getElementById("usernameInputRegister").value;
  password1 = document.getElementById("password1InputRegister").value;
  password2 = document.getElementById("password2InputRegister").value;

  if (password1 != password2) {
    alert("Passwords do not match!")
    throw "Passwords do not match"
  } else {
    password = password1;
  }

  var attributeList = [];

  var dataEmail = {
    Name: 'email',
    Value: username
  }

  var dataName = {
    Name: 'name',
    Value: personalname
  }

  var dataBirthDay = {
    Name: 'birthdate',
    Value: date
  };

  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
  var attributeBirthDay = new AmazonCognitoIdentity.CognitoUserAttribute(dataBirthDay);
  attributeList.push(attributeEmail);
  attributeList.push(attributeName);
  attributeList.push(attributeBirthDay);

  userPool.signUp(username, password, attributeList, null, function (err, result) {
    if (err) {
      alert(err);
      return;
    }
    var cognitoUser = userPool.getCurrentUser();
    cognitoUser = result.user;
  });

}
