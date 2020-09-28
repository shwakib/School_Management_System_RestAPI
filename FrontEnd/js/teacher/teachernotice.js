$(document).ready(function(){

    LoadTeacherClasses();
    LoadTeacherSections();
    
    $("#noticeclasstable").change(function(){
        
        LoadTeacherSubjects();
    });

    
    $("#noticesubjecttable").change(function(){
        
        
    });
    
    $("#postbutton").click(function(){
        
        PostNotice();
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

    

    function PostNotice()
{
    var sectionidnotice=$("#noticesectiontable").val();
    var subjectidnotice=$("#noticesubjecttable").val();
    var classidnotice=$("#noticeclasstable").val();
	$.ajax({
		url:"https://localhost:44373/api/teachers/classes/"+classidnotice+"/sections/"+sectionidnotice+"/subjects/"+subjectidnotice+"/cnotices",
		method:"post",
		headers:{
			contentType:"application/json",Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
			
		},
		data:{
			noticesubject:$("#noticesubject").val(),
			noticedescription:$("#noticebody").val(),
            sectionid:sectionidnotice,
            subjectid:subjectidnotice,
			classid:classidnotice,
            
		},
		complete:function(xmlHttp,status){
			if(xmlHttp.status==201)
			{
				$("#coursenoticemessage").html("Notice Posted!");
				$("#noticesubject").val("");
			$("#noticebody").val("");
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
				$("#coursenoticemessage").html("Error");
				console.log(xmlHttp.status+":"+xmlHttp.statusText);
			}
		}
	});
}

   

});