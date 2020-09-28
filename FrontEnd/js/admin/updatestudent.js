$(document).ready(function(){
    populatedropdown();
    LoadClass();

    $("#update_student_from_admin").validate({
        debug: true,
        rules: {
           
            studentname: "required",
            studentpassword: {
                required: true,
                pwcheck: true,
                minlength: 8
            },
            studentconfirmpassword:{
                required: true,
                equalTo: "#studentpassword"
            },
            studentdob: "required",
            studentphone:{
                required: true,
                minlength: 11,
                maxlength: 11
            },
            studentaddress:"required",
            studentemail:{
                required: true,
                email: true
            },
            sbg: "required",
            studentfees: "required"

        },
        messages:{
            studentid: "",
            studentname: "Student name is required",
            studentpassword: {
                required: "Password is required",
                pwcheck: "Password must contain caps, number, special character",
                minlength: "Minimum length should be 8"
            },
            studentconfirmpassword:{
                required: "Confirm Password is required",
                equalTo: "Does not match with Password!"
            },
            studentdob: "Date of birth is required",
            studentphone:{
                required: "Phone number is required",
                minlength: "Minimum length should be 11",
                maxlength: "Maximum length should be 11"
            },
            studentaddress:"Student Address is required",
            studentemail:{
                required: "Student email is required",
                email: "Email is not valid"
            },
            sbg: "Student Blood Group is required",
            studentfees: "Student fee is required"
        }
    });

    $.validator.addMethod("pwcheck", function(value) {
        return /^(?=.*[a-z])[A-Za-z0-9\d=!\-@._*]+$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
     });

    $("#Studentdropdown").change(function(){
            LoadStudentInfo();
        });

    $("#classid").change(function(){        
        LoadSpecificSections_View();
    });

    $("#updatestudentbtn").click(function(){
            updateStudent();
        });

    $("#deletebutton").click(function(){
            
            deleteStudent();
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
                            str='<option selected disabled>Select One</option>';
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

    function populatedropdown()
        {
        $.ajax({
                url:"https://localhost:44373/api/admins/students",
                method:"get",
                headers:{
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;
                        var str='<option selected>Select One </option>';
                        for (var i = 0; i < data.length; i++) {
                            str+="<option value="+data[i].id+">"+data[i].studentname+"</option>";
                            $("#Studentdropdown").html(str);
                            
                            
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

        function LoadStudentInfo()
    {
        var id=$("#Studentdropdown").val();
        $.ajax({
                url:"https://localhost:44373/api/admins/students/"+id,
                method:"get",
                headers:{
                    contentType:"application/json",
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;
                            $("#studentid").val(data.studentid);
                            $("#studentname").val(data.studentname);
                            $("#studentpassword").val(data.studentpassword);
                            var split = data.studentdob.split("T");
                            $("#studentdob").val(split[0]);
                            //$("#studentdob").val(data.studentdob);
                            $("#studentphone").val(data.studentphone);
                            $("#studentaddress").val(data.studentaddress);
                            $("#studentemail").val(data.studentemail);
                            $("#sbg").val(data.studentbloodgroup);
                            $("#studentfees").val(data.studentfees);
                            $("#classid").val(data.classid);
                            
                            LoadSpecificSections_View();

                            var delay = 300;
                            setTimeout(function() {
                                $("#sectionid").val(data.sectionid);
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

    function updateStudent()
    {
        var id=$("#Studentdropdown").val();
        $.ajax({
                url:"https://localhost:44373/api/admins/students/"+id,
                method:"put",
                headers:{
                    contentType:"application/json",
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                data:{
                    studentid:$("#studentid").val(),
                            studentname:$("#studentname").val(),
                            studentpassword:$("#studentpassword").val(),
                            studentdob:$("#studentdob").val(),
                            studentphone:$("#studentphone").val(),
                            studentaddress:$("#studentaddress").val(),
                            studentemail:$("#studentemail").val(),
                            studentbloodgroup:$("#sbg").val(),
                            studentfees:$("#studentfees").val(),
                            classid:$("#classid").val(),
                            sectionid:$("#sectionid").val(),
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        $("#updatemessage").html("Student Info edited!");
                        $("#studentid").val("");
                            $("#studentname").val("");
                            $("#studentpassword").val("");
                            $("#studentdob").val("");
                            $("#studentphone").val("");
                            $("#studentaddress").val("");
                            $("#studentemail").val("");
                            $("#sbg").val("");
                            $("#studentfees").val("");
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

    function deleteStudent()
        {
            var id=$("#Studentdropdown").val();
            $.ajax({
                    url:"https://localhost:44373/api/admins/students/"+id,
                    method:"delete",
                    headers:{
                        contentType:"application/json",
                        Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                    },
                    complete:function(xmlHttp,status){
                        if(xmlHttp.status==204)
                        {
                                $("#deletemessage").html("Student deleted");
                                $("#studentid").val("");
                            $("#studentname").val("");
                            $("#studentpassword").val("");
                            $("#studentdob").val("");
                            $("#studentphone").val("");
                            $("#studentaddress").val("");
                            $("#studentemail").val("");
                            $("#sbg").val("");
                            $("#studentfees").val("");
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
                            $("#deletemessage").html("Error");
                            console.log(xmlHttp.status+":"+xmlHttp.statusText);
                        }
                    }
                });
        }
});