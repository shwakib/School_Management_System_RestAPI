$(document).ready(function(){

LoadSuperAdminInfo();

$("#update_superadmin_from_superadmin").validate({
	debug: true,
	rules: {
		superadminname: "required",
		superadminpassword: {
			required: true,
			pwcheck: true,
			minlength: 8
		},
		superadminconfirmpassword:{
			required: true,
			equalTo: "#superadminpassword"
		}
	},
	messages: {
		superadminname: "SuperAdmin name is required",
		superadminpassword: {
			required: "Password is required",
			pwcheck: "Password must contain caps, number, special character",
			minlength: "Minimum length should be 8"
		},
		superadminconfirmpassword:{
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

$("#updatesuperadminbtn").click(function(){
		//validate();
		updatesuperadmin();
	});


function LoadSuperAdminInfo()
{
	$.ajax({
			url:"https://localhost:44373/api/superadmins/"+localStorage.userid,
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
						$("#superadminid").val(localStorage.userid);
						$("#superadminname").val(data.superadminname);
						$("#superadminpassword").val(data.superadminpassword);
					
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

function updatesuperadmin()
{
    $.ajax({
            url:"https://localhost:44373/api/superadmins/"+localStorage.userid,
            method:"put",
            headers:{
				contentType:"application/json",
				Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
            },
            data:{
                superadminid:$("#superadminid").val(),
				superadminname:$("#superadminname").val(),
				superadminpassword:$("#superadminpassword").val(),
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    $("#updatemessage").html("Super Admin Info edited!");
                    
                    LoadSuperAdminInfo();
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
});