var token;
var name;
var sub;
function showUser() {
    var name = readCookie('name');
    document.getElementById('name').innerHTML = name;
    token = readCookie('accessToken');
    sub = readCookie('sub');
    getBalance()
}

function getBalance() {
    $.ajax({
        type: 'GET',
        url: _config.apiInfo.url + "/balance?acc=" + sub,
        crossDomain: true,
        crossOrigin: true,
        contentType: "application/json",
        dataType: "json",
        headers: {
            auth: token,
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