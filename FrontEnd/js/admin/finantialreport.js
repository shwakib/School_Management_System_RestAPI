$(document).ready(function(){

    TotalTeacher();
    TotalStudent();
    TotalStudentFee();
    TotalTeacherSalary();

    var expense;
    var income;
    var delay = 300;
    setTimeout(function() {
        var profit=income-expense;
        $("#account_total").html(profit);
    }, delay);
  
    
    var printfinancial = function() {
        DocRaptor.createAndDownloadDoc("", {
          test: true, // test documents are free, but watermarked
          type: "pdf",
          document_content: document.querySelector('html').innerHTML, // use this page's HTML
          // document_content: "<h1>Hello world!</h1>",               // or supply HTML directly
          // document_url: "http://example.com/your-page",            // or use a URL
          // javascript: true,                                        // enable JavaScript processing
          // prince_options: {
          //   media: "screen",                                       // use screen styles instead of print styles
          // }
        })
      }
    
    function TotalTeacher()
{
	$.ajax({
			url:"https://localhost:44373/api/admins/reports/teachercount",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
				
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
						
						$("#teacher_count").html(data);
					
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

function TotalStudent()
{
	$.ajax({
			url:"https://localhost:44373/api/admins/reports/studentcount",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
				
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
						
						$("#student_count").html(data);
					
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

function TotalStudentFee()
{
	$.ajax({
			url:"https://localhost:44373/api/admins/reports/studentfee",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
				
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
						
						$("#studentfee_total").html(data);
                        income=data;
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

function TotalTeacherSalary()
{
	$.ajax({
			url:"https://localhost:44373/api/admins/reports/teacherSalary",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
				
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
						
						$("#teachersalry_total").html(data);
                        expense=data;
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