$(document).ready(function(){
populatedropdown();

$("#update_admin_from_superadmin").validate({
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

$("#admindropdown").change(function(){
		LoadAdminInfo();
	});

$("#updateadminbtn").click(function(){
		updateadmin();
	});

$("#deletebutton").click(function(){
		
		deleteAdmin();
	});


function LoadAdminInfo()
{
	var id=$("#admindropdown").val();
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
						$("#adminid").val(data.adminid);
						$("#adminname").val(data.adminname);
						$("#adminpassword").val(data.adminpassword);
					
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

function updateadmin()
{
	var id=$("#admindropdown").val();
    $.ajax({
            url:"https://localhost:44373/api/superadmins/admins/"+id,
            method:"put",
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
                if(xmlHttp.status==200)
                {
                    $("#updatemessage").html("Admin Info edited!");
                    $("#adminid").val("");
					$("#adminname").val("");
					$("#adminpassword").val("");
                    populatedropdown();
				}
				else if(xmlHttp.status==401)
				{
					$(location).attr('href', "http://127.0.0.1:5500/views/login.html");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
                else
                {
                    $("#updatemessage").html("Error");
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
				contentType:"application/json",
				Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    var data=xmlHttp.responseJSON;
                    var str='<option selected>Select One </option>';
                    for (var i = 0; i < data.length; i++) {
                        str+="<option value="+data[i].id+">"+data[i].adminname+"</option>";
                        $("#admindropdown").html(str);
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

	function deleteAdmin()
	{
		var id=$("#admindropdown").val();
		$.ajax({
				url:"https://localhost:44373/api/superadmins/admins/"+id,
				method:"delete",
				headers:{
					contentType:"application/json",
					Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
				},
				complete:function(xmlHttp,status){
					if(xmlHttp.status==204)
					{
						$("#deletemessage").html("Admin deleted");

						$("#adminid").val("");
						$("#adminname").val("");
						$("#adminpassword").val("");
						populatedropdown();
					}
					else if(xmlHttp.status==401)
				{
					$(location).attr('href', "http://127.0.0.1:5500/views/login.html");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
					else
					{
						$("#deletemessage").html("Error");
						console.log(xmlHttp.status+":"+xmlHttp.statusText);
					}
				}
			});
	}
});