$(document).ready(function(){

    LoadTeacherClasses();

    $("#classid_view").change(function(){
        LoadSpecificSections_View();
        LoadSpecificSubjecs_View();
    });

    $("#subjectid_view").change(function(){
        // PopulateAssignmentDropdown();
        $("#notes_View").html("<tr><th width=200px>Assignment Title</th><th width=200px>File</th><th width=200px>StudentID</th></tr>");
        LoadNotes();
    });
    
    $("#subjectid_upload").change(function(){
        $("#post_date").val((new Date().toLocaleString("sv-SE") + '').replace(' ','T'));
    });

    // $("#assignmentid_view").change(function(){
    //     $("#Assignment_View").html("<tr><th width=200px>Assignment Title</th><th width=200px>File</th><th width=200px>StudentID</th></tr>");
    //     LoadAssignments();
    // });
    
    $("#classid_upload").change(function(){
        LoadSpecificSections_Upload();
        LoadSpecificSubjecs_Upload();
    });

    $("#upload_btn").click(function(){
        UploadAssignment();
        CreateAssignmentinDB();
    });
    
    $('#uploadfile').change(function() {
        var filename = $('input[type=file]').val().split('\\').pop();
       console.log(filename,$('#ass_name'));
         var lastIndex = filename.lastIndexOf("\\");   
         $('#ass_name').val(filename);
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
                            $("#classid_view").html(str);
                            $("#classid_upload").html(str);
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
                url:"https://localhost:44373/api/teachers/"+localStorage.userid+"/sections/",
                method:"get",
                headers:{
                    contentType:"application/json"
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
                            $("#sectionid_view").html(str);
                        };
                    }
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
    
        });
    }

    function LoadSpecificSections_Upload()
    {
        $.ajax({
                url:"https://localhost:44373/api/teachers/"+localStorage.userid+"/sections/",
                method:"get",
                headers:{
                    contentType:"application/json"
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
                            $("#sectionid_upload").html(str);
                        };
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
                url:"https://localhost:44373/api/teachers/"+$("#classid_view").val()+"/subjects/",
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
                            $("#subjectid_view").html(str);
                        };
                    }
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
    
        });
    }

    function LoadSpecificSubjecs_Upload()
    {
        $.ajax({
                url:"https://localhost:44373/api/teachers/"+$("#classid_upload").val()+"/subjects/",
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
                            $("#subjectid_upload").html(str);
                        };
                    }
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
    
        });
    }

    // function PopulateAssignmentDropdown()
    // {
    //     $.ajax({
    //             url:"https://localhost:44373/api/teachers/sections/"+$("#sectionid_view").val()+"/subjects/"+$("#subjectid_view").val()+"/assignments/t",
    //             method:"get",
    //             headers:{
    //                 contentType:"application/json"
    //             },
    //             complete:function(xmlHttp,status){
    //                 if(xmlHttp.status==200)
    //                 {
    //                     var data=xmlHttp.responseJSON;

    //                     var str='';
    //                     str='<option selected disabled>Select Assignment</option>';

    //                     for (var i = 0; i < data.length; i++) {
    //                         //alert(data[i].classid);
                            
    //                         str+="<option value="+data[i].assignmentid+">"+data[i].assignmenttitle+"</option>";
    //                         $("#assignmentid_view").html(str);
    //                     };
    //                 }
    //                 else
    //                 {
    //                     console.log(xmlHttp.status+":"+xmlHttp.statusText);
    //                 }
    //             }	
    
    //     });
    // }

    function LoadNotes()
    {
        $.ajax({
                url:"https://localhost:44373/api/teachers/sections/"+$("#sectionid_view").val()+"/subjects/"+$("#subjectid_view").val()+"/assignments/"+$("#assignmentid_view").val(),
                method:"get",
                headers:{
                    contentType:"application/json"
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str+="<tr><th width=200px>Assignment Title</th><th width=200px>File</th><th width=200px>StudentID</th><th width=200px>Post Date</th></tr>";
                        for (var i = 0; i < data.Assignment_s.length; i++) {
                            str+="<tr><td>"+$("#assignmentid_view option:selected").text()+"</td><td><a href=https://localhost:44373"+data.Assignment_s[i].directory+data.Assignment_s[i].filename+">"+data.Assignment_s[i].filename+"</a></td><td>"+data.Assignment_s[i].studentid+"</td><td>"+data.Assignment_s[i].postdate+"</td></tr>";
                            $("#Assignment_View").html(str);
                        };
                    }
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
		});
    }

    function UploadAssignment()
    {

        var data = new FormData();
        var file = $("#uploadfile").get(0).files;

        if(file.length > 0)
        {
            data.append("UploadFile", file[0]);
            data.append("assignmenttitle", $("#ass_title").val());
        }

        var xhr = new XMLHttpRequest();
        (xhr.upload || xhr).addEventListener('progress', function(e) {
            var done = e.position || e.loaded
            var total = e.totalSize || e.total;
            console.log('xhr progress: ' + Math.round(done/total*100) + '%');
        });

        xhr.addEventListener('load', function(e) {
            console.log('xhr upload complete', e, this.responseText);
        });

        xhr.open('post', "https://localhost:44373/api/teachers/sections/"+$("#sectionid_upload").val()+"/subjects/"+$("#subjectid_upload").val()+"/notes/"+localStorage.userid, true);
        xhr.send(data);

    }

    function CreateAssignmentinDB()
    {
	$.ajax({
		url:"https://localhost:44373/api/teachers/sections/"+$("#sectionid_upload").val()+"/subjects/"+$("#subjectid_upload").val()+"/notes/"+localStorage.userid+"/db/",
		method:"post",
		headers:{
			contentType:"application/json"
		},
		data:{
			sectionid:$("#sectionid_upload").val(),
			subjectid:$("#subjectid_upload").val(),
			notetitle:$("#ass_title").val(),
			filename:$("#ass_name").val(),
			postdate:$("#post_date").val()
			
		},
		complete:function(xmlHttp,status){
			if(xmlHttp.status==200)
			{
				$("#uploadmessage").html("File Uploaded!");		
			}
			else
			{
				$("#uploadmessage").html("Error");
				console.log(xmlHttp.status+":"+xmlHttp.statusText);
			}
		}
	});
    }
    

});