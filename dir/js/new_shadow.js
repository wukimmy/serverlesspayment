$(document).ready(function (){ 
 
    var alias = Cookies.get('user_alias') 
    var id = Cookies.get('user_id') 
    var authToken = Cookies.get('acces_token'); 
 
   $("#submit").click(function (event){ 
       event.preventDefault();
       var data = { 
 
       creator_id : id, 
       shadow_title: $("#title").val(), 
       shadow_description: $("#description").val(), 
       activity_type: $("select#activity option:checked").val(), 
       shadow_address: $("#address").val(), 
       start_date: $("#initialDate").val()+" "+ $("#initialTime").val(), 
       end_date: $("#finalDate").val()+" "+ $("#finalTime").val(), 
       status_shadow: 1, 
       vacancies: $("#vaccancies").val(), 
       filled_vacancies:0 
    }; 
 
    var obj = JSON.stringify(data); 
 
 
    $.ajax({ 
 
        type:'POST', 
        url: "https://2f8wgdo69f.execute-api.us-east-1.amazonaws.com/api/shadows", 
        crossDomain:true, 
        contentType:"application/json", 
        dataType:"json", 
 
        headers: { 
                   Authorization: authToken 
        }, 
 
       data : obj, 
 
        success : function(data){ 
            alert("success!");
            $("form").trigger("reset");
        } 
 
      }); 
         
 
   }); 
 
  $("#clear").click(function (){ 
    $("form").trigger("reset"); 
 
  }); 
 
 
});