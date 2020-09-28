$(document).ready(function(){

    LoadTeacherClasses();
    LoadTeacherSections();
    
    $("#gradeclasstable").change(function(){
        
        LoadTeacherSubjects();
    });

    
    $("#gradesubjecttable").change(function(){
        
        LoadGrades();
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
                            $("#gradeclasstable").html(str);
                            
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
                            $("#gradesectiontable").html(str);
                            
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
        var classid=$("#gradeclasstable").val();
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
                            $("#gradesubjecttable").html(str);
                            
                        };
                    }
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
    
        });
    }

    function LoadGrades()
    {
        var subjectid=$("#gradesubjecttable").val();
        var sectionid=$("#gradesectiontable").val();
        $.ajax({
                url:"https://localhost:44373/api/teachers/sections/"+sectionid+"/subjects/"+subjectid+"/grades",
                method:"get",
                headers:{
                    contentType:"application/json",Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str+="<tr><th width=120px><b>Student ID</b></th><th width=120px><b>Quiz 1</b></th><th width=120px><b>Quiz 2</b></th><th width=120px><b>Assignment 1</b></th><th width=120px><b>Half Yearly</b></th><th width=120px><b>Quiz 3</b></th><th width=120px><b>Quiz 4</b></th><th width=120px><b>Assignment 2</b></th><th width=120px><b>Final Exam</b></th><th width=120px><b>Final Grade</b></th></tr>";

                        for (var i = 0; i < data.length; i++) {
                            //alert(data[i].classid);
                            
                            str+="<tr><th width=120px><b>"+data[i].studentid+"</b></th><th width=120px><b>"+data[i].quiz1+"</b></th><th width=120px><b>"+data[i].quiz2+"</b></th><th width=120px><b>"+data[i].assignment1+"</b></th><th width=120px><b>"+data[i].halfyearlymark+"</b></th><th width=120px><b>"+data[i].quiz3+"</b></th><th width=120px><b>"+data[i].quiz4+"</b></th><th width=120px><b>"+data[i].assignment2+"</b></th><th width=120px><b>"+data[i].finalexammark+"</b></th><th width=120px><b>"+data[i].finalgrade+"</b></th><tr>";    
                            $("#gradetable").html(str);
                            
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

   

});