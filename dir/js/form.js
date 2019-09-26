
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById('canvas').hidden = ""
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    var mediaConfig = { video: true };
    var errBack = function (e) {
        console.log('An error has occurred!', e)
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
            video.srcObject = stream;
            video.play();
        });
    }
    else if (navigator.getUserMedia) { 
        navigator.getUserMedia(mediaConfig, function (stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if (navigator.webkitGetUserMedia) { 
        navigator.webkitGetUserMedia(mediaConfig, function (stream) {
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);
    } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
        navigator.mozGetUserMedia(mediaConfig, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }
    document.getElementById('snap').addEventListener('click', function () {
        transfer()
    });
}, false);

function transfer() {
    var fromAcc = readCookie('sub');
    var fromAmount = readCookie('amount')
    var to = '[userName to transfer]'
    var toAmount = '0'
    var token = readCookie('accessToken')
    var body ={
        from: fromAcc,
        fromAmount: fromAmount,
        to: to,
        toAmount: toAmount,
        amount: '[Amount to transfer]' ,
    }
    $.ajax({
        type: 'POST',
        url: "https://piywfurbh0.execute-api.us-east-1.amazonaws.com/dev/transaction",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(body),
        beforeSend: function (jqXHR, settings) {
            jqXHR.setRequestHeader('Authorization', token);
        },
        headers: {
            Authorization: token
        },
        success: function (data) {
            console.log(data)
        },
        error: function (err) {
            console.log(err)
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
