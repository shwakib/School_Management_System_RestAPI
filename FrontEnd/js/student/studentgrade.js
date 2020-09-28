$(document).ready(function(){

    LoadSpecificSubjects_View();

    $("#subjectlist").change(function(){        
        LoadGradebySubject();
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
                            $("#subjectlist").html(str);
                            
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

    function LoadGradebySubject()
    {
        var subjectid=$("#subjectlist").val();
        $.ajax({
                url:"https://localhost:44373/api/students/"+localStorage.userid+"/subjects/"+subjectid+"/grades",
                method:"get",
                headers:{
                    contentType:"application/json"
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str+="<tr><th width=120px><b>Quiz 1</b></th><th width=120px><b>Quiz 2</b></th><th width=120px><b>Assignment 1</b></th><th width=120px><b>Half Yearly</b></th><th width=120px><b>Quiz 3</b></th><th width=120px><b>Quiz 4</b></th><th width=120px><b>Assignment 2</b></th><th width=120px><b>Final Exam</b></th><th width=120px><b>Final Grade</b></th></tr>";

                        
                        str+="<tr><th width=120px><b>"+data.quiz1+"</b></th><th width=120px><b>"+data.quiz2+"</b></th><th width=120px><b>"+data.assignment1+"</b></th><th width=120px><b>"+data.halfyearlymark+"</b></th><th width=120px><b>"+data.quiz3+"</b></th><th width=120px><b>"+data.quiz4+"</b></th><th width=120px><b>"+data.assignment2+"</b></th><th width=120px><b>"+data.finalexammark+"</b></th><th width=120px><b>"+data.finalgrade+"</b></th><tr><tr><td colspan=9 align=middle><button onclick=printpdf()>Print</button></td></tr>";    
                            
                            $("#gradetable").html(str);
                            
                        
                    }
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
        });
    }
});