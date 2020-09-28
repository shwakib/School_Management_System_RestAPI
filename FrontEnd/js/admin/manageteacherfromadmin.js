$(document).ready(function(){
    populatedropdown();
    LoadClass();

    $("#update_teacher_from_admin").validate({
        debug: true,
        rules: {
            
            teachername: "required",
            teacherpassword: {
                required: true,
                pwcheck: true,
                minlength: 8
            },
            teacherconfirmpassword:{
                required: true,
                equalTo: "#teacherpassword"
            },
            tbg: "required",
            teacheremail:{
                required: true,
                email: true
            },
            
            teacherphone:{
                required: true,
                minlength: 11,
                maxlength: 11
            },
            teachersalary:"required",
            
            
        },
        messages:{
            teacherid: "",
            teachername: "Teacher name is required",
            teacherpassword: {
                required: "Password is required",
                pwcheck: "Must contain caps, num, special char",
                minlength: "Minimum length should be 8"
            },
            teacherconfirmpassword:{
                required: "Confirm Password is required",
                equalTo: "Does not match with Password!"
            },
            tbg: "Teacher Blood Group is required",
            teacheremail:{
                required: "Teacher email is required",
                email: "Email is not valid"
            },
            subjectid: "SubjectID is required",
            teacherphone:{
                required: "Phone number is required",
                minlength: "Minimum length should be 11",
                maxlength: "Maximum length should be 11"
            },
            teachersalary:"Teacher Salary is required",
            classid: "Class ID is required",
            sectionid: "Section ID is required"
        }
    });

    $.validator.addMethod("pwcheck", function(value) {
        return /^(?=.*[a-z])[A-Za-z0-9\d=!\-@._*]+$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
     });

    $("#classid").change(function(){
            
        LoadSpecificSections_View();
        LoadSpecificSubjecs_View();
    });
    
    
    $("#Teacherdropdown").change(function(){
           
        LoadTeacherInfo();
        
    });
    
    $("#updateteacherbtn").click(function(){
            updateTeacher();
        });
    
    $("#deletebutton").click(function(){
            deleteTeacher();
        });
    
        function LoadClass()
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
                            str='<option selected disabled>Select One </option>';
                                for (var i = 0; i < data.length; i++) {
                                    str+="<option value="+data[i].classid+">"+data[i].classname+"</option>";
                                    $("#classid").html(str);
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
    
        function LoadSpecificSections_View()
        {
            $.ajax({
                    url:"https://localhost:44373/api/admins/classes/"+$("#classid").val()+"/sections",
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
                                $("#sectionid").html(str);
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

        function LoadSpecificSubjecs_View()
        {
            $.ajax({
                    url:"https://localhost:44373/api/teachers/"+$("#classid").val()+"/subjects/",
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
                                
                                str+="<option value="+data[i].subjectid+">"+data[i].subjectname+"</option>";
                                $("#subjectid").html(str);
                            };
                            
                        }
                        else
                        {
                            console.log(xmlHttp.status+":"+xmlHttp.statusText);
                        }
                    }	
        
            });
        }
    
    function LoadTeacherInfo()
    {
        var id=$("#Teacherdropdown").val();
        $.ajax({
                url:"https://localhost:44373/api/admins/teachers/"+id,
                method:"get",
                headers:{
                    contentType:"application/json",
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;
                            $("#teacherid").val(data.teacherid);
                            
                            $("#classid").val(data.classid).trigger('change');
                            
                            $("#teachername").val(data.teachername);
                            $("#teacherpassword").val(data.teacherpassword);
                            $("#tbg").val(data.teacherbloodgroup);
                            $("#teacheremail").val(data.teacheremail);
                            $("#teacherphone").val(data.teacherphone);
                            $("#teachersalary").val(data.teachersalary);
                            
                            
                            var delay = 300;
                            setTimeout(function() {
                                LoadTeacherSubSec();
                            }, delay);
                            
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

    function LoadTeacherSubSec()
    {
        var id=$("#Teacherdropdown").val();
        $.ajax({
                url:"https://localhost:44373/api/admins/teachers/"+id,
                method:"get",
                headers:{
                    contentType:"application/json",
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        $("#sectionid").val(data.sectionid);
                        $("#subjectid").val(data.subjectid);
                            
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
    
    function updateTeacher()
    {
        var id=$("#Teacherdropdown").val();
        $.ajax({
                url:"https://localhost:44373/api/admins/teachers/"+id,
                method:"put",
                headers:{
                    contentType:"application/json",
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                data:{
                    teacherid:$("#teacherid").val(),
                    teachername:$("#teachername").val(),
                            teacherpassword:$("#teacherpassword").val(),
                            teacherbloodgroup:$("#tbg").val(),
                            teacheremail:$("#teacheremail").val(),
                            subjectid:$("#subjectid").val(),
                            teacherphone:$("#teacherphone").val(),
                            teachersalary:$("#teachersalary").val(),
                            classid:$("#classid").val(),
                            sectionid:$("#sectionid").val(),
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        $("#updatemessage").html("Teacher Info edited!");
                        
                        $("#teacherid").val("");
                        $("#teachername").val("");
                        $("#teacherpassword").val("");
                        $("#tbg").val("");
                        $("#teacheremail").val("");
                        $("#subjectid").val("");
                        $("#teacherphone").val("");
                        $("#teachersalary").val("");
                        $("#classid").val("");
                        $("#sectionid").val("");
                        
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
    
    function populatedropdown()
        {
        $.ajax({
                url:"https://localhost:44373/api/admins/teachers",
                method:"get",
                headers:{
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;
                        var str='<option selected disabled>Select Teacher</option>';
                        for (var i = 0; i < data.length; i++) {
                            str+="<option value="+data[i].id+">"+data[i].teachername+"</option>";
                            $("#Teacherdropdown").html(str);
                            
                            
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
    
        function deleteTeacher()
        {
            var id=$("#Teacherdropdown").val();
            $.ajax({
                    url:"https://localhost:44373/api/admins/teachers/"+id,
                    method:"delete",
                    headers:{
                        contentType:"application/json",
                        Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                    },
                    complete:function(xmlHttp,status){
                        if(xmlHttp.status==204)
                        {
                                $("#deletemessage").html("Teacher deleted");
                                populatedropdown();
                                $("#teacherid").val("");
                                $("#teachername").val("");
                                $("#teacherpassword").val("");
                                $("#tbg").val("");
                                $("#teacheremail").val("");
                                $("#subjectid").val("");
                                $("#teacherphone").val("");
                                $("#teachersalary").val("");
                                $("#classid").val("");
                                $("#sectionid").val("");
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