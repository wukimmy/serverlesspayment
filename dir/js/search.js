$(document).ready(function(){

var authToken = Cookies.get('acces_token');

$.when(


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

                $('#table').append("<thead id=\"coluna\"><tr id=\"shadow\"><td id=\"date\"><p>"+dia+"</p><p id=\"mes\">"+mes+"</p></td><td id=\"desc\"><ol>"+"<li><b>"+value.shadow_title+"</b></li>"+"</ol><ol>"+"<li>"+value.activity_type+"</li>"+"</ol>"+"<td id=\"id_shadow\">"+id+"</tr>")




                return index < 4;
                });



            $('#tabela').on('click', "tr", function(){

               var id = $(this).find("td#id_shadow").text()

               $.ajax({

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

                        $.each(res, function(index, value){


                            var title = value.shadow_title;

                            var desc = value.shadow_description;

                            var date = moment(value.start_date).format("YYYY-MM-DD");

                            var time = moment(value.start_date).format("HH:mm");

                            var loca = value.shadow_address;

                            var vaccancies = value.vacancies;




                            var w = window.open('../view/detail.html');



                                $(function () {

                                    $(w.document.getElementById('title')).html(title);

                                    $(w.document.getElementById('date')).html(date);

                                    $(w.document.getElementById('time')).html(time);

                                    $(w.document.getElementById('location')).html(loca);

                                    $(w.document.getElementById('description')).html(desc);

                                    $(w.document.getElementById('vaccancies')).html(vaccancies);

                           });


                        })

                    }

               })

            })

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

                $('#table').append("<thead id=\"coluna\"><tr id=\"shadow\"><td id=\"date\"><p>"+dia+"</p><p id=\"mes\">"+mes+"</p></td><td id=\"desc\"><ol>"+"<li><b>"+value.shadow_title+"</b></li>"+"</ol><ol>"+"<li>"+value.activity_type+"</li>"+"</ol>"+"<td id=\"id_shadow\">"+id+"</tr>")


                return index < 4;


            });



              $('#tabela').on('click', "tr", function(){

               var id = $(this).find("td#id_shadow").text()

               $.ajax({

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

                       

                        $.each(res, function(index, value){


                            var title = value.shadow_title;

                            var desc = value.shadow_description;

                            var date = moment(value.start_date).format("YYYY-MM-DD");

                            var time = moment(value.start_date).format("HH:mm");

                            var loca = value.shadow_address;

                            var vaccancies = value.vacancies;


                            var w = window.open('../view/detail.html');



                                $(function () {

                                    $(w.document.getElementById('title')).html(title);

                                    $(w.document.getElementById('date')).html(date);

                                    $(w.document.getElementById('time')).html(time);

                                    $(w.document.getElementById('location')).html(loca);

                                    $(w.document.getElementById('description')).html(desc);

                                    $(w.document.getElementById('vaccancies')).html(vaccancies);

                           });



                        })


                    }


                 })


              })



           }



        })



    })


)


});
