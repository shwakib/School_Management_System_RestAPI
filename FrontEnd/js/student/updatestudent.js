$(document).ready(function(){
    
    LoadStudentClasses();
    LoadStudentSections();
    
    var delay = 200;
    setTimeout(function() {
        LoadStudentInfo();
    }, delay);
    

    $("#update_student_form").validate({
        debug: true,
        rules: {
            studentid: "required",
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
            sbg: "required"

        },
        messages:{
            studentid: "",
            studentname: "",
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
            sbg: "Student Blood Group is required"
        }
    });

    $.validator.addMethod("pwcheck", function(value) {
        return /^(?=.*[a-z])[A-Za-z0-9\d=!\-@._*]+$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
    });

    $("#updatestudentbtn").click(function(){
        updateStudent();
    });

    function LoadStudentClasses()
    {
        
        $.ajax({
                url:"https://localhost:44373/api/students/"+localStorage.userid+"/classes/specific",
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

                        str+="<option value="+data.classid+">"+data.classname+"</option>";
                        $("#classid").html(str);
                      
                    }
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
    
        });
    }

    function LoadStudentSections()
    {
        $.ajax({
                url:"https://localhost:44373/api/students/"+localStorage.userid+"/sections/specific",
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
                        str='<option disabled>Select Section</option>';

                        str+="<option value="+data.sectionid+">"+data.sectionname+"</option>";
                        $("#sectionid").html(str);
            
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
        
        $.ajax({
                url:"https://localhost:44373/api/students/"+localStorage.userid+"/specific",
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
                            $("#studentphone").val(data.studentphone);
                            $("#studentaddress").val(data.studentaddress);
                            $("#studentemail").val(data.studentemail);
                            $("#sbg").val(data.studentbloodgroup);
                            $("#studentfees").val(data.studentfees);

                            // $("#classid").val(data.classid);
                            // $("#sectionid").val(data.sectionid);
                            
                        
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
        
        $.ajax({
                url:"https://localhost:44373/api/students/"+localStorage.userid+"/specific",
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

                        LoadStudentClasses();
                        LoadStudentSections();

                        var delay = 200;
                        setTimeout(function() {
                            LoadStudentInfo();
                        }, delay);
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

// $(window).on('load', function() {

    

//     LoadStudentClasses();
//     LoadStudentSections();
// });