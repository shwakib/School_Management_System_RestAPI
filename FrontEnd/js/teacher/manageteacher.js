$(document).ready(function(){
    
    LoadTeacherClasses();
    LoadSpecificSections();
    var delay = 150;
    setTimeout(function() {
        LoadTeacherInfo();
    }, delay);
    
    

    $("#update_teacher_form").validate({
        debug: true,
        rules: {
            teacherid: "",
            teachername: "",
            teacherpassword: {
                required: true,
                pwcheck: true,
                minlength: 8
            },
            teacherconfirmpassword:{
                required: true,
                equalTo: "#teacherpassword"
            },
            teacherbg: "required",
            teacheremail:{
                required: true,
                email: true
            },
            subjectid: "required",
            teacherphone:{
                required: true,
                minlength: 11,
                maxlength: 11
            },
            teachersalary:"required",
            classid: "required",
            sectionid: "required"
        },
        messages:{
            teacherid: "",
            teachername: "",
            teacherpassword: {
                required: "Password is required",
                pwcheck: "Password must contain caps, number, special character",
                minlength: "Minimum length should be 8"
            },
            teacherconfirmpassword:{
                required: "Confirm Password is required",
                equalTo: "Does not match with Password!"
            },
            teacherbg: "Teacher Blood Group is required",
            teacheremail:{
                required: "Teacher email is required",
                email: "Email is not valid"
            },
            subjectid: "",
            teacherphone:{
                required: "Phone number is required",
                minlength: "Minimum length should be 11",
                maxlength: "Maximum length should be 11"
            },
            teachersalary:"",
            classid: "",
            sectionid: ""
        }
    });

    $.validator.addMethod("pwcheck", function(value) {
        return /^(?=.*[a-z])[A-Za-z0-9\d=!\-@._*]+$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
     });

    $("#updateteacherbtn").click(function(){
            updateTeacher();
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
                        str='<option disabled>Select Class</option>';

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

    function LoadTeacherInfo()
    {
        
        $.ajax({
                url:"https://localhost:44373/api/teachers/"+localStorage.userid+"/specific/",
                method:"get",
                headers:{
                    contentType:"application/json",
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;
                            $("#classid").val(data.classid);
                            $("#teacherid").val(data.teacherid);
                            $("#teachername").val(data.teachername);
                            $("#teacherpassword").val(data.teacherpassword);
                            $("#teacherbg").val(data.teacherbloodgroup);
                            $("#teacheremail").val(data.teacheremail);
                            $("#teacherphone").val(data.teacherphone);
                            $("#teachersalary").val(data.teachersalary);
                            $("#sectionid").val(data.sectionid);

                            var delay = 200;
                            setTimeout(function() {
                                LoadSpecificSubjecs_View();
                            }, delay);

                            var delay = 200;
                            setTimeout(function() {
                                $("#subjectid").val(data.subjectid);
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
                            str='<option disabled>Select Subject</option>';

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

    function LoadSpecificSections()
    {
        $.ajax({
                url:"https://localhost:44373/api/teachers/"+localStorage.userid+"/sections/",
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

    function updateTeacher()
    {
        $.ajax({
                url:"https://localhost:44373/api/teachers/"+localStorage.userid+"/specific",
                method:"put",
                headers:{
                    contentType:"application/json",
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                data:{
                    teacherid:$("#teacherid").val(),
                    teachername:$("#teachername").val(),
                            teacherpassword:$("#teacherpassword").val(),
                            teacherbloodgroup:$("#teacherbg").val(),
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
                                $("#teacherbg").val("");
                                $("#teacheremail").val("");
                                $("#subjectid").val("");
                                $("#teacherphone").val("");
                                $("#teachersalary").val("");
                                $("#classid").val("");
                                $("#sectionid").val("");
                        LoadTeacherInfo();
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

});