using Final_Project_APWDN_SMS.Models;
using Final_Project_APWDN_SMS.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading;
using System.Web.Http;

namespace Final_Project_APWDN_SMS.Controllers
{
    [RoutePrefix("api/logins")]
    public class LoginController : ApiController
    {
        LoginRepository logrepo = new LoginRepository();

        //LOGIN

        [Route("validate")]
        public IHttpActionResult PostLogin([FromBody] Login l)
        {
            string userid = l.userid;
            string password = l.userpass;
            string type = logrepo.checkUserID(userid);
            
            if (type == "01" && logrepo.ValidateSuper(userid, password) != 0)
            {
                string uid = logrepo.ValidateSuper(userid, password).ToString();
                Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(uid), null);
                //var response = Request.CreateResponse(HttpStatusCode.Moved);
                //response.Headers.Location = new Uri("http://127.0.0.1:5500/views/superadmin/superadmindashboard.html");
                //return response;

                return Ok();

            }
            else if (type == "02" && logrepo.ValidateAdmin(userid, password) != 0)
            {
                string uid = logrepo.ValidateAdmin(userid, password).ToString();
                Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(uid), null);
                //var response = Request.CreateResponse(HttpStatusCode.Moved);
                //response.Headers.Location = new Uri("http://127.0.0.1:5500/views/admin/admindashboard.html");
                //return response;

                return Ok();
            }
            else if (type == "03" && logrepo.ValidateTeacher(userid, password) != 0)
            {
                string uid = logrepo.ValidateTeacher(userid, password).ToString();
                Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(uid), null);
                //var response = Request.CreateResponse(HttpStatusCode.Moved);
                //response.Headers.Location = new Uri("http://127.0.0.1:5500/views/teacher/teacherdashboard.html");
                //return response;

                return Ok();
            }
            else if (type == "04" && logrepo.ValidateStudent(userid, password) != 0)
            {
                string uid = logrepo.ValidateStudent(userid, password).ToString();
                Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(uid), null);
                //var response = Request.CreateResponse(HttpStatusCode.Moved);
                //response.Headers.Location = new Uri("http://127.0.0.1:5500/views/student/studentdashboard.html");
                //return response;

                return Ok();
            }
            else
            {
                //var responseMessage = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                //return responseMessage;
                return Unauthorized();
            }
            
        }

    }
}
