function signIn() {

  var authenticationData = {
    Username: document.getElementById("inputUsername").value,
    Password: document.getElementById("inputPassword").value,
  };

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  var poolData = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.clientId,
  };

  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  var userData = {
    Username: document.getElementById("inputUsername").value,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      _config.userInfo.accessToken = result.idToken.jwtToken;
      document.cookie = "accessToken="+_config.userInfo.accessToken;
      getUser();
      window.location.href = "../view/dashboard.html";
    },
    onFailure: function (err) {
      console.log(err)
      alert(err.message || JSON.stringify(err));
    }
  });

  function getUser() {
    console.log("getting user info")
    cognitoUser.getUserAttributes(function (err, result) {
      if (err) {
        alert(err.message);
        return;
      }
      for (i = 0; i < result.length; i++) {
        if (result[i].getName() == "sub") {
          _config.userInfo.sub = result[i].getValue();
        } else if (result[i].getName() == "name") {
          _config.userInfo.name = result[i].getValue();
          document.cookie = "name="+ _config.userInfo.name
          console.log(_config.userInfo.name)
        }
      }
    });
  }
}
