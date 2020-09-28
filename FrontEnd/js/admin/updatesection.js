$(document).ready(function(){

	$("#update_section_from_admin").validate({
		debug: true,
		rules:{
			dropdownclass: "required",
			dropdownsections: "required",
			sectionname: "required"
		},
		messages:{
			dropdownclass: "Select a class",
			dropdownsections: "Select a section",
			sectionname: "Section name is required"
		}
	});

	populatedropdown();

	$("#dropdownclass").change(function(){
        
        LoadSectionsSpecific();
    });

    $("#dropdownsections").change(function(){
        
        LoadSpecificSection();
    });

    $("#updatebtn").click(function(){
		updateSection();
	});

	$("#deletebtn").click(function(){
		
		deleteSection();
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

function LoadSectionsSpecific()
{
	var id=$("#dropdownclass").val();
	$.ajax({
			url:"https://localhost:44373/api/admins/classes/"+id+"/sections",
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
						str+="<option value="+data[i].sectionid+">"+data[i].sectionname+"</option>";
						$("#dropdownsections").html(str);
						
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

function LoadSpecificSection()
{
	var classid=$("#dropdownclass").val();
	var sectionid=$("#dropdownsections").val();
	$.ajax({
			url:"https://localhost:44373/api/admins/classes/"+classid+"/sections/"+sectionid,
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
					
					
						
						$("#sectionname").val(data.sectionname);
						
					
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

function updateSection()
{
	var classid=$("#dropdownclass").val();
	var sectionid=$("#dropdownsections").val();
    $.ajax({
            url:"https://localhost:44373/api/admins/classes/"+classid+"/sections/"+sectionid,
            method:"put",
            headers:{
				contentType:"application/json",
				Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
            },
            data:{
                
				sectionname:$("#sectionname").val(),
				classid:+classid,
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    $("#updatemessage").html("Section Info edited!");
                    
					$("#sectionname").val("");
					$("#dropdownsections").val("");
					
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

function deleteSection()
	{
		var classid=$("#dropdownclass").val();
	var sectionid=$("#dropdownsections").val();
		$.ajax({
				url:"https://localhost:44373/api/admins/classes/"+classid+"/sections/"+sectionid,
				method:"delete",
				headers:{
					contentType:"application/json",
					Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
				},
				complete:function(xmlHttp,status){
					if(xmlHttp.status==204)
					{
						$("#deletemsg").html("Section deleted");

						
						$("#sectionname").val("");
						$("#dropdownsections").val("");
						
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