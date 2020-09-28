$(document).ready(function(){

	LoadAdminID();

	//$("#").validate({});
	$("#create_admin_from_superadmin").validate({
		debug: true,
		rules: {
			adminname: "required",
			adminpassword: {
				required: true,
                pwcheck: true,
                minlength: 8
			},
			adminconfirmpassword:{
				required: true,
				equalTo: "#adminpassword"
			}
		},
		messages: {
			adminname: "Admin name is required",
			adminpassword: {
				required: "Password is required",
                pwcheck: "Password must contain caps, number, special character",
                minlength: "Minimum length should be 8"
			},
			adminconfirmpassword:{
				required: "Confirm Password is required",
				equalTo: "Does not match with Password!"
			}
		}
	});

	$.validator.addMethod("pwcheck", function(value) {
        return /^(?=.*[a-z])[A-Za-z0-9\d=!\-@._*]+$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
     });

	$("#createadminbutton").click(function(){
		//validate();
		createAdmin();
	});


	function LoadAdminID()
	{
	$.ajax({
			url:"https://localhost:44373/api/superadmins/admins/new",
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
					$("#adminid").val(data);
				
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

function createAdmin()
{
	$.ajax({
		url:"https://localhost:44373/api/superadmins/admins",
		method:"post",
		headers:{
			contentType:"application/json",
			Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
		},
		data:{
			adminid:$("#adminid").val(),
			adminname:$("#adminname").val(),
			adminpassword:$("#adminpassword").val(),
		},
		complete:function(xmlHttp,status){
			if(xmlHttp.status==201)
			{
				$("#createmessage").html("Admin created!");
				$("#adminname").val("");
				$("#adminpassword").val("");
				LoadAdminID();		
			}
			else if(xmlHttp.status==401)
				{
					$(location).attr('href', "http://127.0.0.1:5500/views/login.html");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			else
			{
				$("#createmessage").html("Error");
				console.log(xmlHttp.status+":"+xmlHttp.statusText);
			}
		}
	});
}

	
    });