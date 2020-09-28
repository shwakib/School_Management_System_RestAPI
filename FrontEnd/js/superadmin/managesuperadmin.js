$(document).ready(function(){	

	LoadSuperAdmin();
	populatedropdown();

	$("#dropdownsuperadmin").change(function(){
        LoadSuperAdmin1();
    });


function LoadSuperAdmin()
{
	$.ajax({
			url:"https://localhost:44373/api/superadmins",
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
						str+="<tr><td>"+data[i].superadminid+"</td><td>"+data[i].superadminname+"</td></tr>";
						$("#superadmintable").html(str);
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
            url:"https://localhost:44373/api/superadmins",
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
                        str+="<option value="+data[i].id+">"+data[i].superadminname+"</option>";
                        $("#dropdownsuperadmin").html(str);
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
	var id=$("#dropdownsuperadmin").val();
        
	$.ajax({
			url:"https://localhost:44373/api/superadmins/"+id+"/specify",
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
					
					str+="<tr><td>"+data.superadminid+"</td><td>"+data.superadminname+"</td></tr>";
						
					$("#specificsuperadmintable").html(str);
					
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