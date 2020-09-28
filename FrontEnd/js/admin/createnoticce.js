$(document).ready(function(){

	

	

	$("#createnoticebutton").click(function(){
		//validate();
		PostNotice();
	});


	

function PostNotice()
{
	$.ajax({
		url:"https://localhost:44373/api/admins/gnotices",
		method:"post",
		headers:{
			contentType:"application/json",
			Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
			
		},
		data:{
			noticesubject:$("#noticetitle").val(),
			noticedescription:$("#noticebody").val(),
			postdate:$("#PostingTime").val(),
		},
		complete:function(xmlHttp,status){
			if(xmlHttp.status==201)
			{
				$("#createmessage").html("Notice Posted!");
				$("#noticetitle").val("");
			$("#noticebody").val("");
			$("#PostingTime").val("");
					
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