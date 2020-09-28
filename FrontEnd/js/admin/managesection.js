$(document).ready(function(){

	LoadSections();
	populatedropdown();

	$("#dropdownclasses").change(function(){
        
        LoadSection();
    });

    $("#dropdownclass").change(function(){
        
        LoadSectionsSpecific();
    });

    $("#dropdownsections").change(function(){
        
        LoadSpecificSection();
    });


	function LoadSections()
{
	$.ajax({
			url:"https://localhost:44373/api/admins/classes/sections",
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
						str+="<tr><th>"+data[i].classid+"</th><th>"+data[i].sectionname+"</th></tr>";
						$("#sectiontable").html(str);
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

function LoadSection()
{
	var id=$("#dropdownclasses").val();

        
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
					
					str+="<tr><th>Class Name</th><th>Section Name</th></tr>";
					for (var i = 0; i < data.length; i++) {
						str+="<tr><th>"+data[i].classid+"</th><th>"+data[i].sectionname+"</th></tr>";
						$("#sectionbyclass").html(str);
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
						str+="<option>"+data[i].sectionname+"</option>";
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
	var sectionid=$("#dropdownsections").val();
	
	var classid=$("#dropdownclass").val();

	var str='';
	str+="<tr><th>Class Name</th><th>Section Name</th></tr>";
	str+="<tr><th>"+classid+"</th><th>"+sectionid+"</th></tr>";
	$("#specificsectionbyclass").html(str);
}

});