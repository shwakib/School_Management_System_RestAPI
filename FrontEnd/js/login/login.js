$(document).ready(function(){

	$("#submit_button").click(function(){
		localStorage.userid = $("#userid").val();
		localStorage.userpass = $("#password").val();
		Validate();
	});

	function Validate()
    {
        $.ajax({
			url:"https://localhost:44373/api/logins/validate",
			method:"post",
			headers:{
				contentType:"application/json"//,
				//Authorization: "Basic "+btoa($("#userid").val()+":"+$("#password").val())
       			},
			data:{	
				userid: $("#userid").val(),
				userpass: $("#password").val()
        		},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var id = $("#userid").val();
					var split = id.split("-");

					if(split[2]=="01")
					{
					$(location).attr('href', "http://127.0.0.1:5500/views/superadmin/superadmindashboard.html");
					//$(location).attr('href', "../../views/superadmin/superadmindashboard.html");
					}
					else if(split[2]=="02")
					{
					$(location).attr('href', "http://127.0.0.1:5500/views/admin/admindashboard.html");
					}
					else if(split[2]=="03")
					{
					$(location).attr('href', "http://127.0.0.1:5500/views/teacher/teacherdashboard.html");
					}
					else if(split[2]=="04")
					{
					$(location).attr('href', "http://127.0.0.1:5500/views/student/studentdashboard.html");
					}
					else
					{
						$("#message").html("Invalid Credentials");
                		console.log(xmlHttp.status+":"+xmlHttp.statusText);
					}
				}
				else if(xmlHttp.status==401)
				{
					$("#message").html("Invalid Credentials");
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

// globalVariable = {
// 	userid: $("#userid").val(),
// 	userpass: $("#password").val()
// };

