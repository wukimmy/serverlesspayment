$(document).ready(function(){

     var text = Cookies.get('user_alias');
     var authToken = Cookies.get('acces_token');
     

     var url = window.location.href

     
     Cookies.set('url_search', url);


    function clickTable (){

        $('tr').click(function () {

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

                    Cookies.set('shadow_id_search', id);

                    
                    var w = window.open('../view/detail.html');
                }
            })
        })
    }

    $.ajax({
        type:'GET',
        url: "https://2f8wgdo69f.execute-api.us-east-1.amazonaws.com/api/shadows/search",
        crossDomain:true,
        contentType:"application/json",
        dataType:"json",

        headers: {
                   Authorization: authToken
        },

        success : function(data){

            

            $.each(data, function(index, value){

                var id= value.shadow_id;
                var date = new Date(value.start_date);
                var dia = moment(date).format('DD');
                var mes = moment(date).format('MMM');

                $('#table').append("<tr id=\"shadow\"><td id=\"date\"><div id=\"cellDate\"><p>"+dia+"</p><p id=\"mes\">"+mes+
                    "</p></div></td><td id=\"desc\"><div id=\"cellDes\"><ol>"+"<li><b>"+value.shadow_title+"</b></li>"+"</ol><ol>"+"<li>"
                    +value.activity_type+"</li></ol><ol><li class=\"id_shadow\">"+id+"</li></ol></div></td></tr>")

                return index < 4;
            });

            clickTable();
        }
    }),

    $("#filters").on('click', '#enviar', function(e){
        e.preventDefault();
        $("#table").empty();

        $.ajax({

            type:'GET',
            url: "https://2f8wgdo69f.execute-api.us-east-1.amazonaws.com/api/shadows/search?",
            crossDomain:true,
            contentType:"application/json",
            dataType:"json",

            headers: {
                       Authorization: authToken
            },

            data: {

                shadow_title :$("#key").val().trim().replace(/ +(?= )/g,'') || undefined,
                activity_type :$("select#opcao").val() || undefined,
                start_date : $("#initialDate").val() || undefined,
                end_date : $("#FinalDate").val() || undefined
            },

            success : function(data){

               

                $.each(data, function(index, value){

                    var id= value.shadow_id;
                    var date = new Date(value.start_date);
                    var dia = moment(date).format('DD');
                    var mes = moment(date).format('MMM');

                    $('#table').append("<tr id=\"shadow\"><td id=\"date\"><div id=\"cellDate\"><p>"+dia+"</p><p id=\"mes\">"+mes+
                    "</p></div></td><td id=\"desc\"><div id=\"cellDes\"><ol>"+"<li><b>"+value.shadow_title+"</b></li>"+"</ol><ol>"+"<li>"
                    +value.activity_type+"</li></ol><ol><li class=\"id_shadow\">"+id+"</li></ol></div></td></tr>")

                return index < 10;
                });

                clickTable();
            }
        })
    })
});
