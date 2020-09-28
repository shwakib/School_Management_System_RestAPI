$(document).ready(function(){

	LoadSubjects();
	populatedropdown();

	$("#dropdownclasses").change(function(){
        
        LoadSubject();
    });

    $("#dropdownclass").change(function(){
        
        LoadSubjectsSpecific();
    });

    $("#dropdownsubjects").change(function(){
        
        LoadSpecificSubject();
    });


	function LoadSubjects()
{
	$.ajax({
			url:"https://localhost:44373/api/admins/classes/subjects",
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
					
					str+="<tr><th>Class Name</th><th>Section Name</th></tr>";
					for (var i = 0; i < data.length; i++) {
						str+="<tr><th>"+data[i].classid+"</th><th>"+data[i].subjectname+"</th></tr>";
						$("#subjecttable").html(str);
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
					
					str+="<option selected>Select One </option>";
					for (var i = 0; i < data.length; i++) {
						str+="<option value="+data[i].classid+">"+data[i].classname+"</option>";
						$("#dropdownclasses").html(str);
						$("#dropdownclass").html(str);
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
	var id=$("#dropdownclasses").val();

        
	$.ajax({
			url:"https://localhost:44373/api/admins/classes/"+id+"/subjects",
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
					
					str+="<tr><th>Class Name</th><th>Section Name</th></tr>";
					for (var i = 0; i < data.length; i++) {
						str+="<tr><th>"+data[i].classid+"</th><th>"+data[i].subjectname+"</th></tr>";
						$("#subjectbyclass").html(str);
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

function LoadSubjectsSpecific()
{
	var id=$("#dropdownclass").val();
	$.ajax({
			url:"https://localhost:44373/api/admins/classes/"+id+"/subjects",
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
					
					str+="<option selected>Select One </option>";
					for (var i = 0; i < data.length; i++) {
						str+="<option>"+data[i].subjectname+"</option>";
						$("#dropdownsubjects").html(str);
						
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

function LoadSpecificSubject()
{
	var subjectid=$("#dropdownsubjects").val();
	
	var classid=$("#dropdownclass").val();

	var str='';
	str+="<tr><th>Class Name</th><th>Subject Name</th></tr>";
	str+="<tr><th>"+classid+"</th><th>"+subjectid+"</th></tr>";
	$("#specificsubjectbyclass").html(str);
}

});