$(document).ready(function(){

	
	populatedropdown();

	$("#create_subject_from_admin").validate({
		debug: true,
		rules:{
			dropdownclasses: "required",
			subjectname: "required"
		},
		messages:{
			dropdownclasses: "Select a class",
			subjectname: "Subject name is required"
		}
	});

	$("#createbutton").click(function(){
		
		createSubject();
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
						$("#dropdownclasses").html(str);
						
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

function createSubject()
{
	var id=$("#dropdownclasses").val();
	$.ajax({
		url:"https://localhost:44373/api/admins/classes/"+id+"/subjects",
		method:"post",
		headers:{
			contentType:"application/json",
			Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
		},
		data:{
			
			subjectname:$("#subjectname").val(),
			classid:+id,
		},
		complete:function(xmlHttp,status){
			if(xmlHttp.status==201)
			{
				$("#createmessage").html("Subject Created!");
				$("#subjectname").val("");
				
				populatedropdown();		
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