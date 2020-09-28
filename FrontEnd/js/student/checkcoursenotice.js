$(document).ready(function(){

    LoadSpecificSubjects_View();

    $("#noticesubjectlist").change(function(){        
        LoadNoticebySubject();
    });

    function LoadSpecificSubjects_View()
    {
        $.ajax({
                url:"https://localhost:44373/api/students/"+localStorage.userid+"/classes",
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
                        str='<option selected disabled>Select Subject</option>';

                        for (var i = 0; i < data.length; i++) {
                            
                            str+="<option value="+data[i].subjectid+">"+data[i].subjectname+"</option>";
                            $("#noticesubjectlist").html(str);
                            
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

    function LoadNoticebySubject()
    {
        var subjectid=$("#noticesubjectlist").val();
        $.ajax({
                url:"https://localhost:44373/api/students/"+localStorage.userid+"/subjects/"+subjectid+"/cnotices",
                method:"get",
                headers:{
                    contentType:"application/json"
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str+="<tr><th width=120px><b>Notice Title</b></th><th width=120px><b>Notice Description</b></th></tr>";

                        for (var i = 0; i < data.length; i++) {
                        str+="<tr><td width=120px><b>"+data[i].noticesubject+"</b></th><td width=120px><b>"+data[i].noticedescription+"</b></th><tr>";    
                            
                            $("#noticetable").html(str);
                            
                        };
                    }
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
        });
    }

});