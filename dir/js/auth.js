function auth(){
    console.log("Checking session")
    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.clientId
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
                alert(err);
                window.location.href = "../index.html";
                return;
            }
            if(session.isValid() == false){
                _config.userInfo.sub = session.sub;
                _config.userInfo.accessToken = session.sub;
                _config.userInfo.name = session.name;
                console.log("sub " + session.sub)
            }
        });
    }else{
        window.location.href = "../index.html";
    }
}
