$(document).ready(function(){

    LoadSpecificSubjects_View();

    $("#subjectid_view").change(function(){
        LoadSpecificNotes();
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
                            $("#subjectid_view").html(str);
                            
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

    function LoadSpecificNotes()
    {
        $.ajax({
                url:"https://localhost:44373/api/students/"+localStorage.userid+"/subjects/"+$("#subjectid_view").val()+"/notes/",
                method:"get",
                headers:{
                    contentType:"application/json"
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str+="<tr><th width=200px>Notes Title</th><th width=200px>Notes File</th><th width=200px>Post Date</th></tr>";
                        for (var i = 0; i < data.length; i++) {
                            str+="<tr><td>"+data[i].notetitle+"</td><td><a href=https://localhost:44373"+data[i].directory+data[i].filename+">"+data[i].filename+"</a></td><td>"+data[i].postdate+"</td></tr>";
                            $("#Notes_view").html(str);
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