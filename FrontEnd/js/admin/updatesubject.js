$(document).ready(function(){

	
	populatedropdown();

	$("#update_subject_from_admin").validate({
		debug: true,
		rules:{
			dropdownclass: "required",
			dropdownsubjects: "required",
			subjectname: "required"
		},
		messages:{
			dropdownclass: "Select a class",
			dropdownsubjects: "Subject is required",
			subjectname: "Subject name is required"
		}
	});

	$("#dropdownclass").change(function(){
        
        LoadSubjectsSpecific();
    });

    $("#dropdownsubjects").change(function(){
        
        LoadSpecificSubject();
    });

    $("#updatebtn").click(function(){
		updateSubject();
	});

	$("#deletebtn").click(function(){
		
		deleteSubject();
	});

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
						str+="<option value="+data[i].subjectid+">"+data[i].subjectname+"</option>";
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
	var classid=$("#dropdownclass").val();
	var subjectid=$("#dropdownsubjects").val();
	
	$.ajax({
			url:"https://localhost:44373/api/admins/classes/"+classid+"/subjects/"+subjectid,
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
					$("#subjectname").val(data.subjectname);
						
					
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

function updateSubject()
{
	var classid=$("#dropdownclass").val();
	var subjectid=$("#dropdownsubjects").val();
    $.ajax({
            url:"https://localhost:44373/api/admins/classes/"+classid+"/subjects/"+subjectid,
            method:"put",
            headers:{
				contentType:"application/json",
				Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
            },
            data:{
                
				subjectname:$("#subjectname").val(),
				classid:+classid,
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    $("#updatemessage").html("Subject Info edited!");
                    
					$("#subjectname").val("");
					$("#dropdownsubjects").val("");
					
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

function deleteSubject()
	{
		var classid=$("#dropdownclass").val();
	var subjectid=$("#dropdownsubjects").val();
		$.ajax({
				url:"https://localhost:44373/api/admins/classes/"+classid+"/subjects/"+subjectid,
				method:"delete",
				headers:{
					contentType:"application/json",
					Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
				},
				complete:function(xmlHttp,status){
					if(xmlHttp.status==204)
					{
						$("#deletemsg").html("Section deleted");

						
						$("#subjectname").val("");
						$("#dropdownsubjects").val("");
						
						populatedropdown();
						
	
					}
					else if(xmlHttp.status==401)
					{
						$(location).attr('href', "http://127.0.0.1:5500/views/login.html");
						console.log(xmlHttp.status+":"+xmlHttp.statusText);
					}
					else
					{
						$("#deletemsg").html("Error");
						console.log(xmlHttp.status+":"+xmlHttp.statusText);
					}
				}
			});
	}


});