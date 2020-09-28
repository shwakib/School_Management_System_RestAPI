$(document).ready(function(){

    LoadTeacherClasses();
    LoadTeacherSections();
    
    $("#noticeclasstable").change(function(){
        
        LoadTeacherSubjects();
    });

    
    $("#noticesubjecttable").change(function(){
        
        Loadnotices();
    });

    $("#noticelist").change(function(){
        
        Loadnotice();
    });
    
    $("#updatenoticebutton").click(function(){
		updateNotice();
	});

$("#deletenotice").click(function(){
		
		deleteNotice();
	});
    

    function LoadTeacherClasses()
    {
        $.ajax({
                url:"https://localhost:44373/api/teachers/"+localStorage.userid+"/classes",
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
                        str='<option selected disabled>Select Class</option>';

                        for (var i = 0; i < data.length; i++) {
                            //alert(data[i].classid);
                            
                            str+="<option value="+data[i].classid+">"+data[i].classname+"</option>";
                            $("#noticeclasstable").html(str);
                            
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

    function LoadTeacherSections()
    {
        $.ajax({
                url:"https://localhost:44373/api/teachers/"+localStorage.userid+"/sections",
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
                        str='<option selected disabled>Select Section</option>';

                        for (var i = 0; i < data.length; i++) {
                            //alert(data[i].classid);
                            
                            str+="<option value="+data[i].sectionid+">"+data[i].sectionname+"</option>";
                            $("#noticesectiontable").html(str);
                            
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

    function LoadTeacherSubjects()
    {
        var classid=$("#noticeclasstable").val();
        $.ajax({
                url:"https://localhost:44373/api/teachers/"+classid+"/subjects",
                method:"get",
                headers:{
                    contentType:"application/json"
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str='<option selected disabled>Select Subject</option>';

                        for (var i = 0; i < data.length; i++) {
                            //alert(data[i].classid);
                            
                            str+="<option value="+data[i].subjectid+">"+data[i].subjectname+"</option>";
                            $("#noticesubjecttable").html(str);
                            
                        };
                    }
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
    
        });
    }

    function Loadnotices()
    {
        var subjectid=$("#noticesubjecttable").val();
        var sectionid=$("#noticesectiontable").val();
        var classid=$("#noticeclasstable").val();
        $.ajax({
                url:"https://localhost:44373/api/teachers/classes/"+classid+"/sections/"+sectionid+"/subjects/"+subjectid+"/cnotices",
                method:"get",
                headers:{
                    contentType:"application/json",Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str='<option selected disabled>Select Notice</option>';

                        for (var i = 0; i < data.length; i++) {
                            //alert(data[i].classid);
                            
                            str+="<option value="+data[i].noticeid+">"+data[i].noticedescription+"</option>";
                            $("#noticelist").html(str);
                            
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

    function Loadnotice()
    {
        var subjectid=$("#noticesubjecttable").val();
        var sectionid=$("#noticesectiontable").val();
        var classid=$("#noticeclasstable").val();
        var noticeid=$("#noticelist").val();
        $.ajax({
                url:"https://localhost:44373/api/teachers/classes/"+classid+"/sections/"+sectionid+"/subjects/"+subjectid+"/cnotices/"+noticeid,
                method:"get",
                headers:{
                    contentType:"application/json",Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        

                        
                            //alert(data[i].classid);
                            
                            
                            $("#noticesubject").val(data.noticesubject);
                            $("#noticedescription").val(data.noticedescription);
                            
                        
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

    function updateNotice()
{
	var subjectidnotice=$("#noticesubjecttable").val();
        var sectionidnotice=$("#noticesectiontable").val();
        var classidnotice=$("#noticeclasstable").val();
        var noticeidnotice=$("#noticelist").val();
    $.ajax({
            url:"https://localhost:44373/api/teachers/classes/"+classidnotice+"/sections/"+sectionidnotice+"/subjects/"+subjectidnotice+"/cnotices/"+noticeidnotice,
            method:"put",
            headers:{
				contentType:"application/json",Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
				
            },
            data:{
                noticesubject:$("#noticesubject").val(),
                noticedescription:$("#noticedescription").val(),
                sectionid:sectionidnotice,
                subjectid:subjectidnotice,
                classid:classidnotice,
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    $("#updatemessage").html("Notice edited!");
                    $("#noticesubject").val("");
			$("#noticedescription").val("");
            LoadTeacherClasses();
            LoadTeacherSections();
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

function deleteNotice()
	{
		var subjectidnotice=$("#noticesubjecttable").val();
        var sectionidnotice=$("#noticesectiontable").val();
        var classidnotice=$("#noticeclasstable").val();
        var noticeidnotice=$("#noticelist").val();
		$.ajax({
				url:"https://localhost:44373/api/teachers/classes/"+classidnotice+"/sections/"+sectionidnotice+"/subjects/"+subjectidnotice+"/cnotices/"+noticeidnotice,
				method:"delete",
				headers:{
					contentType:"application/json",Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
					
				},
				complete:function(xmlHttp,status){
					if(xmlHttp.status==204)
					{
						$("#deletemessage").html("Notice Deleted!");
                    $("#noticesubject").val("");
			$("#noticedescription").val("");
            LoadTeacherClasses();
            LoadTeacherSections();
            Loadnotices();
                    }
                    else if(xmlHttp.status==401)
                        {
                            $(location).attr('href', "http://127.0.0.1:5500/views/login.html");
                            console.log(xmlHttp.status+":"+xmlHttp.statusText);
                        }
					
					else
					{
						$("#deletemessage").html("Error");
						console.log(xmlHttp.status+":"+xmlHttp.statusText);
					}
				}
			});
	}

   

});