var token;
var name;
var sub;
function showUser() {
    var name = readCookie('name');
    document.getElementById('name').innerHTML = name;
    token = readCookie('accessToken');
    sub = readCookie('sub');
    getBalance(sub)
    jQuery('#qrcode').qrcode({
        render: "table",
        text: sub
    });
}
function getBalance(acc) {
    $.ajax({
        type: 'GET',
        url:  _config.apiInfo.url +"balance?acc=" + acc,
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (jqXHR, settings) {
            jqXHR.setRequestHeader('Authorization', token);
        },
        headers: {
            Authorization: token
        },
        success: function (data) {
            document.cookie = "amount="+ data.amount
            document.getElementById('balance').innerHTML = data.amount;
        },
        error: function(err){
            console.log(err)
            document.getElementById('balance').innerHTML = "We had an error: " + err;
        }
    })
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}