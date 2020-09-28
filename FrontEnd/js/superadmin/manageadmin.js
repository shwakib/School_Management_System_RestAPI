$(document).ready(function(){

	LoadAdmin();
	populatedropdown();

	$("#dropdownadmin").change(function(){
        
        LoadSuperAdmin1();
    });


function LoadAdmin()
{
	$.ajax({
			url:"https://localhost:44373/api/superadmins/admins",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					
					str+="<tr><th>SuperAdmin ID</th><th>SuperAdmin Name</th></tr>";
					for (var i = 0; i < data.length; i++) {
						str+="<tr><td>"+data[i].adminid+"</td><td>"+data[i].adminname+"</td></tr>";
						$("#admintable").html(str);
					};
				}
				else if(xmlHttp.status==401)
				{
					$(location).attr('href', "http://127.0.0.1:5500/views/login.html");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
}	

function populatedropdown()
	{
    $.ajax({
            url:"https://localhost:44373/api/superadmins/admins",
			method:"get",
			headers:{
				Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
			},
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    var data=xmlHttp.responseJSON;
                    var str='<option selected>Select One </option>';
                    for (var i = 0; i < data.length; i++) {
                        str+="<option value="+data[i].id+">"+data[i].adminname+"</option>";
                        $("#dropdownadmin").html(str);
                        
                        
                    };
                    
				}
				else if(xmlHttp.status==401)
				{
					$(location).attr('href', "http://127.0.0.1:5500/views/login.html");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
                else
                {
                    console.log(xmlHttp.status+":"+xmlHttp.statusText);
                }
            }    
        });
	}

	function LoadSuperAdmin1()
{
	var id=$("#dropdownadmin").val();
        
	$.ajax({
			url:"https://localhost:44373/api/superadmins/admins/"+id,
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					
					str+="<tr><th>SuperAdmin ID</th><th>SuperAdmin Name</th></tr>";
					
					

						str+="<tr><td>"+data.adminid+"</td><td>"+data.adminname+"</td></tr>";
						
						$("#specificadmintable").html(str);
					
				}
				else if(xmlHttp.status==401)
				{
					$(location).attr('href', "http://127.0.0.1:5500/views/login.html");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
}					


});