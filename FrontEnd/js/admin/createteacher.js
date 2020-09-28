$(document).ready(function(){

	LoadTeacherID();
	LoadClass();

	$("#create_teacher_from_admin").validate({
        debug: true,
        rules: {
            
            teachername: "required",
            teacherpassword: {
                required: true,
                pwcheck: true,
                minlength: 8
            },
            teacherconfirmpassword:{
                required: true,
                equalTo: "#teacherpassword"
            },
            tbg: "required",
            teacheremail:{
                required: true,
                email: true
            },
            
            teacherphone:{
                required: true,
                minlength: 11,
                maxlength: 11
            },
            teachersalary:"required",
            
            
        },
        messages:{
            teacherid: "",
            teachername: "Teacher name is required",
            teacherpassword: {
                required: "Password is required",
                pwcheck: "Must contain caps, number, special character",
                minlength: "Minimum length should be 8"
            },
            teacherconfirmpassword:{
                required: "Confirm Password is required",
                equalTo: "Does not match with Password!"
            },
            tbg: "Teacher Blood Group is required",
            teacheremail:{
                required: "Teacher email is required",
                email: "Email is not valid"
            },
            subjectid: "SubjectID is required",
            teacherphone:{
                required: "Phone number is required",
                minlength: "Minimum length should be 11",
                maxlength: "Maximum length should be 11"
            },
            teachersalary:"Teacher Salary is required",
            classid: "Class ID is required",
            sectionid: "Section ID is required"
        }
    });

    $.validator.addMethod("pwcheck", function(value) {
        return /^(?=.*[a-z])[A-Za-z0-9\d=!\-@._*]+$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
     });

	 $("#classid").change(function(){
		
		LoadSection();
		LoadSubject();
	});

	$("#createteacherbtn").click(function(){
		//alert("working");
		createTeacher();
	});


	function LoadTeacherID()
{
	$.ajax({
			url:"https://localhost:44373/api/admins/teachers/new",
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
					$("#teacherid").val(data);
				
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

function LoadSubject()
{
	var classid=$("#classid").val();
		//alert(classid);
	$.ajax({
			url:"https://localhost:44373/api/admins/classes/"+classid+"/subjects",
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
                            str+="<option value="+data[i].subjectid+">"+data[i].subjectname+"</option>";
                            $("#subjectid").html(str);
                            
                            
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

function createTeacher()
{
	$.ajax({
		url:"https://localhost:44373/api/admins/teachers",
		method:"post",
		headers:{
			contentType:"application/json",
			Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
		},
		data:{
			teacherid:$("#teacherid").val(),
			teachername:$("#teachername").val(),
			teacherpassword:$("#teacherpassword").val(),
			teacherbloodgroup:$("#tbg").val(),
			teacheremail:$("#teacheremail").val(),
			subjectid:$("#subjectid").val(),
			teacherphone:$("#teacherphone").val(),
			teachersalary:$("#teachersalary").val(),
			classid:$("#classid").val(),
			sectionid:$("#sectionid").val(),
		},
		complete:function(xmlHttp,status){
			if(xmlHttp.status==201)
			{
				$("#createmessage").html("Teacher created!");
				
				LoadTeacherID();		
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