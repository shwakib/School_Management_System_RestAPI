$(document).ready(function(){

	LoadStudents();
	populatedropdown();
	$("#dropdownstudent").change(function(){
        
        LoadStudent();
    });

	function LoadStudents()
{
	$.ajax({
			url:"https://localhost:44373/api/admins/students",
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
					
					str+="<tr><td>Student ID</td><td>Student Name</td><td>Student Date of Birth</td><td>Student Phone</td><td>Student Address</td><td>Student Email</td><td>Student Blood Group</td><td>Student Fees</td><td>Class Name</td><td>Section</td></tr>";
					for (var i = 0; i < data.length; i++) {
						str+="<tr><td>"+data[i].studentid+"</td><td>"+data[i].studentname+"</td><td>"+data[i].studentdob+"</td><td>"+data[i].studentphone+"</td><td>"+data[i].studentaddress+"</td><td>"+data[i].studentemail+"</td><td>"+data[i].studentbloodgroup+"</td><td>"+data[i].studentfees+"</td><td>"+data[i].classid+"</td><td>"+data[i].sectionid+"</td></tr>";
						$("#studenttable").html(str);
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
            url:"https://localhost:44373/api/admins/students",
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
                        str+="<option value="+data[i].id+">"+data[i].studentname+"</option>";
                        $("#dropdownstudent").html(str);
                        
                        
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

	function LoadStudent()
{
	var id=$("#dropdownstudent").val();
        
	$.ajax({
			url:"https://localhost:44373/api/admins/students/"+id,
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
					
					str+="<tr><td>Student ID</td><td>Student Name</td><td>Student Date of Birth</td><td>Student Phone</td><td>Student Address</td><td>Student Email</td><td>Student Blood Group</td><td>Student Fees</td><td>Class Name</td><td>Section</td></tr>";
					
					

						str+="<tr><td>"+data.studentid+"</td><td>"+data.studentname+"</td><td>"+data.studentdob+"</td><td>"+data.studentphone+"</td><td>"+data.studentaddress+"</td><td>"+data.studentemail+"</td><td>"+data.studentbloodgroup+"</td><td>"+data.studentfees+"</td><td>"+data.classid+"</td><td>"+data.sectionid+"</td></tr>";
						
						$("#specificstudenttable").html(str);
					
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