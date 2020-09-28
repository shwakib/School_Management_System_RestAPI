$(document).ready(function(){

    LoadSpecificSubjects_View();

    $("#subjectid_view").change(function(){
        LoadSpecificAssignment();
    });
    
    $("#subjectid_upload").change(function(){
        PopulateAssignmentDropdown();
    });

    $('#uploadfile').change(function() {
        var filename = $('input[type=file]').val().split('\\').pop();
        console.log(filename,$('#ass_name'));
        var lastIndex = filename.lastIndexOf("\\");   
        $('#ass_name').val(filename);
        $("#post_date").val((new Date().toLocaleString("sv-SE") + '').replace(' ','T'));
    });

    $("#upload_btn").click(function(){
        UploadAssignment();
        CreateAssignmentinDB_s();
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
                            $("#subjectid_upload").html(str);
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

    function LoadSpecificAssignment()
    {
        $.ajax({
                url:"https://localhost:44373/api/students/"+localStorage.userid+"/subjects/"+$("#subjectid_view").val()+"/assignments/",
                method:"get",
                headers:{
                    contentType:"application/json"
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str+="<tr><th width=200px>Assignment Title</th><th width=200px>Assignment File</th><th width=200px>Due Date</th></tr>";
                        for (var i = 0; i < data.length; i++) {
                            str+="<tr><td>"+data[i].assignmenttitle+"</td><td><a href=https://localhost:44373"+data[i].directory+data[i].filename+">"+data[i].filename+"</a></td><td>"+data[i].duedate+"</td></tr>";
                            $("#assignment_view").html(str);
                        };
                    }
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
        });
    }

    function PopulateAssignmentDropdown()
    {
        $.ajax({
                url:"https://localhost:44373/api/students/"+localStorage.userid+"/subjects/"+$("#subjectid_upload").val()+"/assignments/",
                method:"get",
                headers:{
                    contentType:"application/json"
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str='<option selected disabled>Select Assignment</option>';

                        for (var i = 0; i < data.length; i++) {
                            str+="<option value="+data[i].assignmentid+">"+data[i].assignmenttitle+"</option>";
                            $("#ass_title").html(str);
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

        xhr.open('post', "https://localhost:44373/api/students/"+localStorage.userid+"/subjects/"+$("#subjectid_upload").val()+"/assignments/s", true);
        xhr.send(data);

    }
    

    function CreateAssignmentinDB_s()
    {
        
        $.ajax({
            url:"https://localhost:44373/api/students/"+localStorage.userid+"/subjects/"+$("#subjectid_upload").val()+"/assignments/s/"+$("#ass_title").val()+"/db",
            method:"post",
            headers:{
                contentType:"application/json"
            },
            data:{
                filename:$("#ass_name").val(),
                postdate:$("#post_date").val(),
                studentid:localStorage.userid,
                assignmentid_t:$("#ass_title").val()
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    debugger
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