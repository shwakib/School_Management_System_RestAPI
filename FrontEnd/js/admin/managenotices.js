$(document).ready(function(){
    populatedropdown();
    
    
    
    $("#noticedropdown").change(function(){
            LoadNoticeInfo();
        });
    
    $("#updatenoticebtn").click(function(){
            updatenotice();
        });
    
    $("#deletebutton").click(function(){
            
            deleteNotice();
        });
    
    
    function LoadNoticeInfo()
    {
        var id=$("#noticedropdown").val();
        $.ajax({
                url:"https://localhost:44373/api/admins/gnotices/"+id,
                method:"get",
                headers:{
                    contentType:"application/json",
                    
                    
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;
                            $("#noticetitle").val(data.noticesubject);
                            $("#noticebody").html(data.noticedescription);
                            $("#noticedate").val(data.postdate);
                        
                    }
                    
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
    
            });
    }
    
    function updatenotice()
    {
        var id=$("#noticedropdown").val();
        $.ajax({
                url:"https://localhost:44373/api/admins/gnotices/"+id,
                method:"put",
                headers:{
                    contentType:"application/json",
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                
                },
                data:{
                    noticesubject:$("#noticetitle").val(),
			        noticedescription:$("#noticebody").val(),
			        postdate:$("#noticedate").val(),
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        $("#updatemessage").html("Notice Edited!");
                        $("#noticetitle").val("");
                        $("#noticebody").val("");
                        $("#noticedate").val("");
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
                url:"https://localhost:44373/api/admins/gnotices",
                method:"get",
                headers:{
                    contentType:"application/json",
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                   
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;
                        var str='<option selected>Select One </option>';
                        for (var i = 0; i < data.length; i++) {
                            str+="<option value="+data[i].noticeid+">"+data[i].noticesubject+"</option>";
                            $("#noticedropdown").html(str);
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
    
        function deleteNotice()
        {
            var id=$("#noticedropdown").val();
            $.ajax({
                    url:"https://localhost:44373/api/admins/gnotices/"+id,
                    method:"delete",
                    headers:{
                        contentType:"application/json",
                        Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                       
                    },
                    complete:function(xmlHttp,status){
                        if(xmlHttp.status==204)
                        {
                            $("#deletemessage").html("Notice deleted");
    
                            
                        $("#noticetitle").val("");
                        $("#noticebody").val("");
                        $("#noticedate").val("");
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