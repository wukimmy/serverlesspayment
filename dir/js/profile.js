
$(document).ready(function(){

    var alias = Cookies.get('user_alias');
    var url = window.location.href;
    var authToken = Cookies.get('acces_token');
    Cookies.set('url_profile', url);
    $.ajax({
        type: 'GET',
        url: 'https://iyysrbty02.execute-api.us-east-1.amazonaws.com/default/quick-sight-embeded-url',
        contentType: "application/json",
        dataType: "json",
        success : function (data){

            $('#progress').click(function(e) {
                e.preventDefault();
                window.open(data);
                return false;
            })
        }
    })
    function clickTable (){
              $('tr#shadow_upcoming').click(function () {
               var id = $(this).find("li.id_shadow").text()
               $.ajax({
                    type : 'GET',
                    url: "https://2f8wgdo69f.execute-api.us-east-1.amazonaws.com/api/shadows/search",
                    crossDomain:true,
                    contentType:"application/json",
                    dataType:"json",

                    headers: {
                               Authorization: authToken
                    },
                    data: {
                        shadow_id : id
                    },
                    success : function (res){
                        Cookies.set('shadow_id_profile', id);
                        var w = window.open('../view/detail_subscribed.html');
                    },
                    error: function(res){
                        alert("We had a problem search the shadow " + res)
                    }
               })
            })
        }
        $.ajax({
            type:'GET',
            url: "https://2f8wgdo69f.execute-api.us-east-1.amazonaws.com/api/users/" + alias,
            crossDomain:true,
            contentType:"application/json",
            dataType:"json",

            headers: {
                       Authorization: authToken
            },
            success : function(data){
                $('#userName').append(data.user_name);
                $('#userRole').append(data.user_job);
                $('#score').html(data.points+" points");
            },
            error: function(data){
                alert("We had an error searching for the user "+ data);
            }
        })
        $.ajax({
            type:'GET',
            url: "https://2f8wgdo69f.execute-api.us-east-1.amazonaws.com/api/users/" + alias + "/subscribed/past",
            crossDomain:true,
            contentType:"application/json",
            dataType:"json",

            headers: {
                       Authorization: authToken
            },
            success : function(data){
                $.each(data, function(index, value){
                    var date = new Date(value.start_date);
                    var dia = moment(date).format('DD');
                    var mes = moment(date).format('MMM');
                     $('#past').append("<tr id=\"shadow\"><td id=\"date\"><div id=\"cellDate\"><p>"+dia+"</p><p id=\"mes\">"+mes+
                        "</p></div></td><td id=\"desc\"><div id=\"cellDes\"><ol><li><b>"+value.shadow_title+"</b></li></ol><ol><li>"
                        +value.activity_type+"</li></ol></div></td></tr>")
                });
            }
        }),
        $.ajax({
            type:'GET',
            url: "https://2f8wgdo69f.execute-api.us-east-1.amazonaws.com/api/users/"+ alias + "/subscribed/upcoming",
            crossDomain:true,
            contentType:"application/json",
            dataType:"json",

            headers: {
                       Authorization: authToken
            },
            success : function(data){
             
                $.each(data, function(index, value){
                    var id_shadow = value.shadow_id;
                    var date = new Date(value.start_date);
                    var dia = moment(date).format('DD');
                    var mes = moment(date).format('MMM');
                     $('#scheduled').append("<tr id=\"shadow_upcoming\"><td id=\"date\"><div id=\"cellDate\"><p>"+dia+"</p><p id=\"mes\">"+mes+
                        "</p></div></td><td id=\"desc\"><div id=\"cellDes\"><ol><li><b>"+value.shadow_title+"</b></li></ol><ol><li>"
                        +value.activity_type+"</li></ol><ol><li class=\"id_shadow\">"+id_shadow+"</li></ol></div></td></tr>")
                });
                clickTable();
            },
            error: function(data){
                alert("We had an error looking for your scheduled activities " + data);
            }
        })
});
