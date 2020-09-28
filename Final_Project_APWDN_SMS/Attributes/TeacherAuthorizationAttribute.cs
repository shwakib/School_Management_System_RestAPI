using Final_Project_APWDN_SMS.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Final_Project_APWDN_SMS.Attributes
{
    public class TeacherAuthorizationAttribute:AuthorizationFilterAttribute
    {
        LoginRepository logrepo = new LoginRepository();
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);

            if (actionContext.Request.Headers.Authorization != null)
            {
                string encoded = actionContext.Request.Headers.Authorization.Parameter;
                string decoded = Encoding.UTF8.GetString(Convert.FromBase64String(encoded));
                string[] split = decoded.Split(new char[] { ':' });
                string userid = split[0];
                string password = split[1];
                string type = logrepo.checkUserID(userid);
                if (type == "03" && logrepo.ValidateTeacher(userid, password) != 0)
                {
                    string uid = logrepo.ValidateTeacher(userid, password).ToString();
                    Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(uid), null);
                }
                else
                {
                    actionContext.Response = actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized);
                }
            }
            else
            {
                actionContext.Response = actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized);
            }
        }

        
    }
}