$(document).ready(function(){

	Loadteachers();
	populatedropdown();

	$("#dropdownteacheradmin").change(function(){
        
        LoadTeacher();
    });


function Loadteachers()
{
	$.ajax({
			url:"https://localhost:44373/api/admins/teachers",
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
					
					str+="<tr><th>Teacher ID</th><th>Teacher Name</th><th>Teacher Blood Group</th><th>Teacher Email</th><th>Teacher Phone Number</th><th>Teacher Salary</th></tr>";
					for (var i = 0; i < data.length; i++) {
						str+="<tr><td>"+data[i].teacherid+"</td><td>"+data[i].teachername+"</td><td>"+data[i].teacherbloodgroup+"</td><td>"+data[i].teacheremail+"</td><td>"+data[i].teacherphone+"</td><td>"+data[i].teachersalary+"</td></tr>";
						$("#teachertable").html(str);
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
            url:"https://localhost:44373/api/admins/teachers",
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
                        str+="<option value="+data[i].id+">"+data[i].teachername+"</option>";
                        $("#dropdownteacheradmin").html(str);
                        
                        
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

	function LoadTeacher()
{
	var id=$("#dropdownteacheradmin").val();
        
	$.ajax({
			url:"https://localhost:44373/api/admins/teachers/"+id,
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
					
					str+="<tr><th>Teacher ID</th><th>Teacher Name</th><th>Teacher Blood Group</th><th>Teacher Email</th><th>Teacher Phone Number</th><th>Teacher Salary</th></tr>";
					
					

						str+="<tr><td>"+data.teacherid+"</td><td>"+data.teachername+"</td><td>"+data.teacherbloodgroup+"</td><td>"+data.teacheremail+"</td><td>"+data.teacherphone+"</td><td>"+data.teachersalary+"</td></tr>";
						
						$("#loadteacherspecific").html(str);
					
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