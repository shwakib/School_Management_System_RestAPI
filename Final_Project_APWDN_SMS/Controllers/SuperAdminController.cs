using Final_Project_APWDN_SMS.Attributes;
using Final_Project_APWDN_SMS.Models;
using Final_Project_APWDN_SMS.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Final_Project_APWDN_SMS.Controllers
{
    [RoutePrefix("api/superadmins")]

    public class SuperAdminController : ApiController
    {
        SuperAdminRepository suprepo = new SuperAdminRepository();
        AdminRepository adrepo = new AdminRepository();

        //SUPER ADMIN
        [Route("")]
        [SuperAuthorization]
        public IHttpActionResult GetSuperAdmin()
        {
            return Ok(suprepo.GetAll());
        }

        [Route("{id}")]
        [SuperAuthorization]
        public IHttpActionResult GetSuperAdmin(string id)
        {
            SuperAdmin sp = suprepo.GetInfo(id);
            if (sp == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            sp.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/" + sp.superadminid, HttpMethod = "GET", Relation = "Self" });
            sp.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/" + sp.id, HttpMethod = "GET", Relation = "Get Super By Id" });
            sp.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/" + sp.id, HttpMethod = "PUT", Relation = "Edit Super Admin" });


            return Ok(sp);
        }

        [Route("{id}/specify", Name = "GetSuperById")]
        [SuperAuthorization]
        public IHttpActionResult GetSuperAdmin(int id)
        {
            SuperAdmin sp = suprepo.GetByID(id);
            if (sp == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(sp);
        }


        [Route("{id}")]
        [SuperAuthorization]
        public IHttpActionResult PutSuperAdmin([FromBody] SuperAdmin sp, [FromUri] string id)
        {
            //SuperAdmin S = suprepo.GetInfo(id);
            //int sid = S.id;

            //sp.id = sid;
            //sp.superadminid = id;

            suprepo.ManualUpdate(sp, id);

            sp.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/" + sp.superadminid, HttpMethod = "GET", Relation = "Get SUperadmin Info" });
            sp.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/" + sp.id, HttpMethod = "GET", Relation = "Get Super By Id" });
            sp.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/" + sp.id, HttpMethod = "PUT", Relation = "Self" });


            return Ok(sp);
        }

        //ADMIN

        [Route("admins")]
        [SuperAuthorization]
        public IHttpActionResult GetAdmin()
        {
            return Ok(adrepo.GetAll());
        }

        [Route("admins/{id}", Name = "Get_AdminById")]
        [SuperAuthorization]
        public IHttpActionResult GetAdmin(int id)
        {
            Admin a = adrepo.GetByID(id);
            if (a == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/admins" + a.id, HttpMethod = "GET", Relation = "Self" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/admins", HttpMethod = "POST", Relation = "Create Admin" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/admins" + a.id, HttpMethod = "PUT", Relation = "Edit Admin" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/admins" + a.id, HttpMethod = "DELETE", Relation = "Delte Admin" });


            return Ok(a);
        }

        [Route("admins")]
        [SuperAuthorization]
        public IHttpActionResult PostAdmin(Admin s)
        {
            adrepo.Insert(s);
            string url = Url.Link("Get_AdminById", new { id = s.adminid });

            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/admins" + s.id, HttpMethod = "GET", Relation = "Get Admin" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/admins", HttpMethod = "POST", Relation = "Self" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/admins" + s.id, HttpMethod = "PUT", Relation = "Edit Admin" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/admins" + s.id, HttpMethod = "DELETE", Relation = "Delte Admin" });


            return Created(url, s);
        }

        [Route("admins/{id}")]
        [SuperAuthorization]
        public IHttpActionResult PutAdmin([FromBody] Admin a, [FromUri] int id)
        {
            a.id = id;
            adrepo.Edit(a);

            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/admins" + a.id, HttpMethod = "GET", Relation = "Get Admin" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/admins", HttpMethod = "POST", Relation = "Create Admin" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/admins" + a.id, HttpMethod = "PUT", Relation = "Self" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/superadmins/admins" + a.id, HttpMethod = "DELETE", Relation = "Delte Admin" });


            return Ok(a);
        }

        [Route("admins/{id}")]
        [SuperAuthorization]
        public IHttpActionResult DeleteAdmin(int id)
        {
            adrepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }

        //GET NEW ADMIN ID FOR CREATE

        [Route("admins/new")]
        [SuperAuthorization]
        public IHttpActionResult GetNewAdminID()
        {
            return Ok(suprepo.GetNewID());
        }
    }
}
