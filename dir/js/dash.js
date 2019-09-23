
// $(document).ready(function () {
//     var url = window.location.href
//     Cookies.set('url_dash', url);
//     var authToken = _config.userInfo.accessToken;
    
//     var acc = _config.userInfo.sub;
//     $.ajax({
//         type: 'GET',
//         url: "https://2f8wgdo69f.execute-api.us-east-1.amazonaws.com/balance?acc=" + acc,
//         crossDomain: true,
//         contentType: "application/json",
//         dataType: "json",
//         headers: {
//             Authorization: authToken
//         },
//         success: function (data) {
//             document.getElementById('balance').innerHTML = data
//         }
//     })
// });
// function redirect() {
//     window.location.href = "../view/search.html";
// }

function showUser() {
    var authToken = _config.userInfo.accessToken;
    console.log(document.cookie)
}
