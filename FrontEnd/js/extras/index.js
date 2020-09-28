$(document).ready(function(){

    LoadNotices();

    function LoadNotices()
{
	$.ajax({
			url:"https://localhost:44373/api/admins/gnotices",
			method:"get",
			headers:{
				contentType:"application/json"
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					
					str+="<tr><th>Date</th><th>Notice Subject</th><th>Notice Details</th></tr>";
					for (var i = 0; i < data.length; i++) {
						str+="<tr><td onclick=>"+data[i].postdate+"</td><td><a onclick=f1()?id="+data[i].noticeid+" >"+data[i].noticesubject+"</a></td><td>"+data[i].noticedescription+"</td></tr>";
						$("#generalnoticeindex").html(str);
					};
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
}

function f1()
{
    alert(id);
}

});