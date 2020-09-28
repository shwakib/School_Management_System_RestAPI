$(document).ready(function(){

	LoadStudentID();
	LoadClass();

	$("#create_student_from_admin").validate({
        debug: true,
        rules: {
           
            studentname: "required",
            studentpassword: {
                required: true,
                pwcheck: true,
                minlength: 8
            },
            studentconfirmpassword:{
                required: true,
                equalTo: "#studentpassword"
            },
            studentdob: "required",
            studentphone:{
                required: true,
                minlength: 11,
                maxlength: 11
            },
            studentaddress:"required",
            studentemail:{
                required: true,
                email: true
            },
            sbg: "required",
            studentfees: "required"

        },
        messages:{
            studentid: "",
            studentname: "Student name is required",
            studentpassword: {
                required: "Password is required",
                pwcheck: "Password must contain caps, number, special character",
                minlength: "Minimum length should be 8"
            },
            studentconfirmpassword:{
                required: "Confirm Password is required",
                equalTo: "Does not match with Password!"
            },
            studentdob: "Date of birth is required",
            studentphone:{
                required: "Phone number is required",
                minlength: "Minimum length should be 11",
                maxlength: "Maximum length should be 11"
            },
            studentaddress:"Student Address is required",
            studentemail:{
                required: "Student email is required",
                email: "Email is not valid"
            },
            sbg: "Student Blood Group is required",
            studentfees: "Student fee is required"
        }
    });

    $.validator.addMethod("pwcheck", function(value) {
        return /^(?=.*[a-z])[A-Za-z0-9\d=!\-@._*]+$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
     });

	$("#classid").change(function(){
		
            LoadSection();
            
        });

	$("#createstudentbtn").click(function(){
		//alert("working");
		createStudent();
	});

	function LoadStudentID()
{
	$.ajax({
			url:"https://localhost:44373/api/admins/students/new",
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
					$("#studentid").val(data);
				
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

function LoadClass()
{
	$.ajax({
			url:"https://localhost:44373/api/admins/classes",
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
					str='<option selected>Select One </option>';
                        for (var i = 0; i < data.length; i++) {
                            str+="<option value="+data[i].classid+">"+data[i].classname+"</option>";
                            $("#classid").html(str);
                            
                            
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

function LoadSection()
{
	var classid=$("#classid").val();
		//alert(classid);
	$.ajax({
			url:"https://localhost:44373/api/admins/classes/"+classid+"/sections",
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
					str='<option selected>Select One </option>';
                        for (var i = 0; i < data.length; i++) {
                            str+="<option value="+data[i].sectionid+">"+data[i].sectionname+"</option>";
                            $("#sectionid").html(str);
                            
                            
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

function createStudent()
{
	$.ajax({
		url:"https://localhost:44373/api/admins/students",
		method:"post",
		headers:{
			contentType:"application/json",
			Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
		},
		data:{
			studentid:$("#studentid").val(),
			studentname:$("#studentname").val(),
			studentpassword:$("#studentpassword").val(),
			studentdob:$("#studentdob").val(),
			studentphone:$("#studentphone").val(),
			studentaddress:$("#studentaddress").val(),
			studentemail:$("#studentemail").val(),
			studentbloodgroup:$("#sbg").val(),
			studentfees:$("#studentfees").val(),
			classid:$("#classid").val(),
			sectionid:$("#sectionid").val(),
		},
		complete:function(xmlHttp,status){
			if(xmlHttp.status==201)
			{
				$("#createmessage").html("Student created!");
				$("#studentid").val("");
			$("#studentname").val("");
			$("#studentpassword").val("");
			$("#studentdob").val("");
			$("#studentphone").val("");
			$("#studentaddress").val("");
			$("#studentemail").val("");
			$("#sbg").val("");
			$("#studentfees").val("");
			$("#classid").val("");
			$("#sectionid").val("");
				LoadStudentID();	

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