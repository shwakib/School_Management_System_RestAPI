$(document).ready(function(){

	
	populatedropdown();

	$("#create_section_from_admin").validate({
		debug: true,
		rules:{
			dropdownclass: "required",
			sectionname: "required"
		},
		messages:{
			dropdownclass: "Select a class",
			sectionname: "Section name is required"
		}
	});

	$("#createbutton").click(function(){
		createSection();
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

function createSection()
{
	var id=$("#dropdownclasses").val();
	$.ajax({
		url:"https://localhost:44373/api/admins/classes/"+id+"/sections",
		method:"post",
		headers:{
			contentType:"application/json",
			Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
		},
		data:{
			
			sectionname:$("#sectionname").val(),
			classid:+id,
		},
		complete:function(xmlHttp,status){
			if(xmlHttp.status==201)
			{
				$("#createmessage").html("Section Created!");
				$("#sectionname").val("");
				
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