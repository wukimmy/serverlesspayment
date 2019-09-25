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
    console.log(acc)
    // $.ajax({
    //     type: 'GET',
    //     url:"https://piywfurbh0.execute-api.us-east-1.amazonaws.com/dev/balance?acc=" + acc,
    //     crossDomain: true,
    //     crossOrigin: true,
    //     contentType: "application/json",
    //     dataType: "json",
    //     headers: {
    //         'Access-Control-Request-Headers':{
    //             auth: token
    //         }
    //     },
    //     success: function (data) {
    //         console.log(data);
    //     },
    //     error: function(res){
    //         alert("We had a problem with your account " + JSON.stringify(res))
    //     }
    // })

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("balance").innerHTML =
                this.responseText;
        }
    };
    var url = "https://piywfurbh0.execute-api.us-east-1.amazonaws.com/dev/balance?acc=" + acc;
    // var body = 'auth:' + token;
    // xhttp.open("GET", url, true);
    // xhttp.setRequestHeader('auth', token )
    // xhttp.setRequestHeader('crossOrigin', true )
    // xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' )
    // xhttp.send();
    var xhr = createCORSRequest('GET', url);
    xhr.send();
}
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    xhr.setRequestHeader('auth', token )
    return xhr;
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