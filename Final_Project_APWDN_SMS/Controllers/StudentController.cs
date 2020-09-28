using Final_Project_APWDN_SMS.Attributes;
using Final_Project_APWDN_SMS.Models;
using Final_Project_APWDN_SMS.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Final_Project_APWDN_SMS.Controllers
{
    [RoutePrefix("api/students")]
    public class StudentController : ApiController
    {
        StudentRepository studrepo = new StudentRepository();
        Assignment_sRepository ass_s_repo = new Assignment_sRepository();
        Assignment_tRepository ass_t_repo = new Assignment_tRepository();
        SubjectRepository subrepo = new SubjectRepository();
        GradeRepository grepo = new GradeRepository();
        CourseNoticeRepository crepo = new CourseNoticeRepository();
        UploadNoteRepository uprepo = new UploadNoteRepository();

        //STUDENT PROFILE

        [Route("{id}", Name = "Get_StudnetById")]
        [StudentAuthorization]
        public IHttpActionResult GetStudent(int id)
        {
            Student s = studrepo.GetByID(id);
            if(s == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/students/" + s.studentid, HttpMethod = "GET", Relation = "Get Student" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/students/" + s.id, HttpMethod = "GET", Relation = "Self" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/students/" + s.id, HttpMethod = "PUT", Relation = "Edit Student" });


            return Ok(s);
        }

        [Route("{id}/specific")]
        //[StudentAuthorization]
        public IHttpActionResult GetStudent(string id)
        {
            Student s = studrepo.GetInfo(id);
            if (s == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(s);
        }

        [Route("{id}")]
        [StudentAuthorization]
        public IHttpActionResult PutStudent([FromBody] Student s, [FromUri] int id)
        {
            s.id = id;
            studrepo.Edit(s);

            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/students/" + s.studentid, HttpMethod = "GET", Relation = "Get Student" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/students/" + s.id, HttpMethod = "GET", Relation = "Get Student By Id" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/students/" + s.id, HttpMethod = "PUT", Relation = "Self" });


            return Ok(s);
        }

        [Route("{id}/specific")]
        //[StudentAuthorization]
        public IHttpActionResult PutStudent_Manual([FromBody] Student s, [FromUri] string id)
        {
            studrepo.ManualUpdate(s, id);
            return Ok(s);
        }


        //ASSIGNMENT

        // GET ASSIGNMENTS FROM TEACHER USING STUDENTID AND SECTIONID -- FOR VIEW
        [Route("{id}/subjects/{id2}/assignments/")]
        public IHttpActionResult GetAssignments(string id, [FromUri] int id2)
        {
            Student s = studrepo.GetInfo(id);
            List<Assignment_t> T = ass_t_repo.GetAssignmentsBySubjectsBySections(s.sectionid, id2);
            return Ok(T);
        }

        /// <summary>
        /// FILE UPLOAD
        /// </summary>

        [Route("{id}/subjects/{id2}/assignments/s")]
        //[StudentAuthorization]
        public IHttpActionResult PostAssignment([FromUri] string id, [FromUri] int id2)
        {
            Student s = studrepo.GetInfo(id);

            string dir = HttpContext.Current.Server.MapPath("~/Uploads/Assignments/Students/" + id + s.sectionid + id2 + "/");
            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var file = HttpContext.Current.Request.Files["UploadFile"];
                if (file != null)
                {
                    var savefile = Path.Combine(HttpContext.Current.Server.MapPath("~/Uploads/Assignments/Students/" + id + s.sectionid + id2 + "/"), file.FileName);
                    file.SaveAs(savefile);
                }
            }

            return Ok();

        }

        /// <summary>
        /// POST ASSIGNMENT DETAILS TO DB
        /// </summary>
        /// <returns></returns>

        [Route("{id}/subjects/{id2}/assignments/s/{id3}/db")]
        public IHttpActionResult PostAss_s(Assignment_s As, [FromUri] string id, [FromUri] int id2, [FromUri] int id3)
        {
            Student s = studrepo.GetInfo(id);
            As.directory = "/Uploads/Assignments/Students/" + id + s.sectionid + id2 + "/";
            As.sectionid = s.sectionid;
            As.subjectid = id2;
            As.studentid = id;
            As.assignmentid_t = id3;
            
            ass_s_repo.Insert(As);
            return Ok();
        }


        // GET CLASSID-SUBJECTID FROM STUDENTID
        [Route("{id}/classes")]
        public IHttpActionResult GetClassid(string id)
        {
            Class C = ass_s_repo.GetClass(id);
            List<Subject> S = subrepo.GetSubjectsByClass(C.classid);
            return Ok(S);
        }

        // GET CLASSID FROM STUDENTID
        [Route("{id}/classes/specific")]
        public IHttpActionResult GetClass_Student(string id)
        {
            Class C = ass_s_repo.GetClass(id);
            return Ok(C);
        }

        // GET SECTIONID FROM STUDENTID
        [Route("{id}/sections/specific")]
        public IHttpActionResult GetSection_Student(string id)
        {
            Section S = studrepo.GetSection(id);
            return Ok(S);
        }

        [Route("{id}/subjects/{id2}/grades/")]
        public IHttpActionResult GetGrades([FromUri]string id, [FromUri]int id2)
        {
            Student s = studrepo.GetInfo(id);
            Grade g = grepo.GetGradeBySectionsBySubjects(s.sectionid, id, id2);
            return Ok(g);
        }

        [Route("{id}/subjects/{id1}/cnotices")]
        public IHttpActionResult GetCourseNotice([FromUri] string id, int id1)
        {
            Student s = studrepo.GetInfo(id);
            //CourseNotice c = crepo.GetCNoticesBySubject(id1);
            List<CourseNotice> c = crepo.GetNoticesByClassSectionSubject(s.classid, s.sectionid, id1);
            return Ok(c);
        }

        //GetUploadNotes
        [Route("{id}/subjects/{id2}/notes/")]
        public IHttpActionResult GetNotes(string id, [FromUri] int id2)
        {
            Student s = studrepo.GetInfo(id);
            List<UploadNote> up = uprepo.GetUploadNotes(s.sectionid, id2);
            return Ok(up);
        }

    }
}
