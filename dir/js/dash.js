var token;
var name;
var sub;
function showUser() {
    var name = readCookie('name');
    document.getElementById('name').innerHTML = name;
    token = readCookie('accessToken');
    sub = readCookie('sub');
    getBalance(sub)
    console.log(sub)
    console.log("all cookies: " + document.cookie)

    //jquery('#qrcode').qrcode("this plugin is great");
}

function getBalance(acc) {
    console.log(acc)
    $.ajax({
        type: 'GET',
        url:"https://piywfurbh0.execute-api.us-east-1.amazonaws.com/dev/balance?acc=" + acc,
        crossDomain: true,
        crossOrigin: true,
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Access-Control-Request-Headers':{
                auth: token
            }
        },
        success: function (data) {
            console.log(data);
        },
        error: function(res){
            alert("We had a problem with your account " + JSON.stringify(res))
        }
    })
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}