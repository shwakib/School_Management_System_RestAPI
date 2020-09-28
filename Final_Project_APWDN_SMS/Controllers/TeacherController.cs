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
    [RoutePrefix("api/teachers")]
    public class TeacherController : ApiController
    {
        TeacherRepository trepo = new TeacherRepository();
        SectionRepository secrepo = new SectionRepository();
        SubjectRepository subrepo = new SubjectRepository();
        Assignment_tRepository ass_t_repo = new Assignment_tRepository();
        Assignment_sRepository ass_s_repo = new Assignment_sRepository();
        GradeRepository graderepo = new GradeRepository();
        CourseNoticeRepository courrepo = new CourseNoticeRepository();
        HomeworkRepository hrepo = new HomeworkRepository();
        UploadNoteRepository uprepo = new UploadNoteRepository();

        //TEACHER PROFILE

        [Route("{id}", Name = "Get_TeacherById")]
        [TeacherAuthorization]
        public IHttpActionResult GetTeacher(int id)
        {
            Teacher t = trepo.GetByID(id);
            if (t == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/" + t.teacherid, HttpMethod = "GET", Relation = "Get Teacher" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/" + t.id, HttpMethod = "GET", Relation = "Self" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/" + t.teacherid, HttpMethod = "PUT", Relation = "Edit Teacher" });


            return Ok(t);
        }

        [Route("{id}/specific")]
        //[TeacherAuthorization]
        public IHttpActionResult GetTeacher(string id)
        {
            Teacher t = trepo.GetInfo(id);
            if (t == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(t);
        }

        [Route("{id}")]
        [TeacherAuthorization]
        public IHttpActionResult PutTeacher([FromBody] Teacher t, [FromUri] int id)
        {
            t.id = id;
            trepo.Edit(t);

            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/" + t.teacherid, HttpMethod = "GET", Relation = "Get Teacher" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/" + t.id, HttpMethod = "GET", Relation = "Get Teacher by Id" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/" + t.teacherid, HttpMethod = "PUT", Relation = "Self" });


            return Ok(t);
        }

        [Route("{id}/specific")]
        //[TeacherAuthorization]
        public IHttpActionResult PutTeacher([FromBody] Teacher t, [FromUri] string id)
        {
            trepo.ManualUpdate(t, id);
            return Ok(t);
        }

        //ASSIGNMENTS

        [Route("sections/{id}/subjects/{id2}/assignments/t")]
        //[TeacherAuthorization]
        public IHttpActionResult GetAssignments([FromUri] int id, [FromUri] int id2)
        {
            List<Assignment_t> a = ass_t_repo.GetAssignmentsBySubjectsBySections(id, id2);
            if (a == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(a);
        }

        [Route("sections/{id}/subjects/{id2}/assignments/t/{id3}", Name = "GetAssignmentById")]
        //[TeacherAuthorization]
        public IHttpActionResult GetAssignment([FromUri] int id, [FromUri] int id2, [FromUri] int id3)
        {
            Assignment_t a = ass_t_repo.GetAssignmentBySubjectsBySections(id, id2, id3);
            if (a == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(a);
        }

        /// <summary>
        /// FILE UPLOAD
        /// </summary>

        [Route("sections/{id}/subjects/{id2}/assignments/t/{id3}")]
        //[TeacherAuthorization]
        public IHttpActionResult PostAssignment([FromUri] int id, [FromUri] int id2, [FromUri] string id3)
        {
            Assignment_t a = new Assignment_t();

            string dir = HttpContext.Current.Server.MapPath("~/Uploads/Assignments/Teachers/"+id3+id+id2+"/");
            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var file = HttpContext.Current.Request.Files["UploadFile"];
                if (file != null)
                {
                    var savefile = Path.Combine(HttpContext.Current.Server.MapPath("~/Uploads/Assignments/Teachers/" + id3 + id + id2 + "/"), file.FileName);
                    a.filename = file.FileName;
                    a.directory = "~/Uploads/Assignments/Teachers/" + id3 + id + id2 + "/";
                    file.SaveAs(savefile);
                }
            }

            return Ok();

        }

        /// <summary>
        /// POST ASSIGNMENT DETAILS TO DB
        /// </summary>
        /// <returns></returns>

        [Route("sections/{id}/subjects/{id2}/assignments/t/{id3}/db/")] //20-0000-03
        //[TeacherAuthorization]
        public IHttpActionResult PostAssignmenttoDB(Assignment_t a, [FromUri] int id, [FromUri] int id2, [FromUri] string id3)
        {
            a.sectionid = id;
            a.subjectid = id2;
            a.directory = "/Uploads/Assignments/Teachers/" + id3 + id + id2 + "/";
            ass_t_repo.Insert(a);
            string url = Url.Link("GetAssignmentById", new { id = a.sectionid, id2 = a.subjectid, id3 = a.assignmentid });
            return Created(url, a);
        }


        [Route("sections/{id}/subjects/{id2}/assignments/t/{id3}")]
        //[TeacherAuthorization]
        public IHttpActionResult PutAssignment([FromBody] Assignment_t a, [FromUri] int id, [FromUri] int id2, [FromUri] int id3)
        {
            a.sectionid = id;
            a.subjectid = id2;
            a.assignmentid = id3;
            ass_t_repo.Edit(a);

            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + a.sectionid + "/subjects/" + a.subjectid + "/assignments/t/" + a.assignmentid, HttpMethod = "GET", Relation = "Get Assignment" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + a.sectionid + "/subjects/" + a.subjectid + "/assignments/t/" + a.assignmentid, HttpMethod = "POST", Relation = "Create Assignment" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + a.sectionid + "/subjects/" + a.subjectid + "/assignments/t/" + a.assignmentid, HttpMethod = "PUT", Relation = "Self" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + a.sectionid + "/subjects/" + a.subjectid + "/assignments/t/" + a.assignmentid, HttpMethod = "DELETE", Relation = "Delete Assignment" });


            return Ok(a);
        }

        [Route("sections/{id}/subjects/{id2}/assignments/t/{id3}")]
        //[TeacherAuthorization]
        public IHttpActionResult DeleteAssignment([FromUri] int id, [FromUri] int id2, [FromUri] int id3)
        {
            ass_t_repo.Delete(id3);
            return StatusCode(HttpStatusCode.NoContent);
        }

        //GRADES

        [Route("sections/{id}/subjects/{id2}/grades")]
        [TeacherAuthorization]
        public IHttpActionResult GetGrades([FromUri] int id, [FromUri] int id2)
        {
            List<Grade> g = graderepo.GetGradesBySectionsBySubjects(id, id2);
            if (g == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(g);
        }


        /*[Route("sections/{id}/subjects/{id2}/grades/{id3}", Name = "GetGradeById")]
        //[TeacherAuthorization]
        public IHttpActionResult GetGrade([FromUri] int id, [FromUri] int id2, [FromUri] int id3)
        {
            Grade g = graderepo.GetGradeBySectionsBySubjects(id, id2, id3);
            if (g == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(g);
        }*/


        [Route("sections/{id}/subjects/{id2}/grades")]
        [TeacherAuthorization]
        public IHttpActionResult PostGrade([FromBody] Grade g, [FromUri] int id, [FromUri] int id2)
        {
            g.sectionid = id;
            g.subjectid = id2;
            graderepo.Insert(g);
            /*string url = Url.Link("GetGradeById", new { id = g.sectionid, id2 = g.subjectid, id3 = g.gradeid });
            return Created(url, g);*/

            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + g.sectionid + "/subjects/" + g.subjectid + "/grades/" + g.gradeid, HttpMethod = "GET", Relation = "Get Grade" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + g.sectionid + "/subjects/" + g.subjectid + "/grades/", HttpMethod = "POST", Relation = "Self" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + g.sectionid + "/subjects/" + g.subjectid + "/grades/" + g.gradeid, HttpMethod = "PUT", Relation = "Edit Grade" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + g.sectionid + "/subjects/" + g.subjectid + "/grades/" + g.gradeid, HttpMethod = "DELETE", Relation = "Delete Grade" });


            return Ok();
        }


        [Route("sections/{id}/subjects/{id2}/grades/{id3}")]
        [TeacherAuthorization]
        public IHttpActionResult PutGrade([FromBody] Grade g, [FromUri] int id, [FromUri] int id2, [FromUri] string id3)
        {
            g.sectionid = id;
            g.subjectid = id2;
            g.studentid = id3;
            graderepo.Edit(g);

            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + g.sectionid + "/subjects/" + g.subjectid + "/grades/" + g.gradeid, HttpMethod = "GET", Relation = "Get Grade" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + g.sectionid + "/subjects/" + g.subjectid + "/grades/", HttpMethod = "POST", Relation = "Create Grade" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + g.sectionid + "/subjects/" + g.subjectid + "/grades/" + g.gradeid, HttpMethod = "PUT", Relation = "Self" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + g.sectionid + "/subjects/" + g.subjectid + "/grades/" + g.gradeid, HttpMethod = "DELETE", Relation = "Delete Grade" });


            return Ok(g);
        }


        [Route("sections/{id}/subjects/{id2}/grades/{id3}")]
        [TeacherAuthorization]
        public IHttpActionResult DeleteGrade([FromUri] int id, [FromUri] int id2, [FromUri] int id3)
        {
            graderepo.Delete(id3);
            return StatusCode(HttpStatusCode.NoContent);
        }

        //COURSE NOTICE

        [Route("classes/{id}/sections/{id1}/subjects/{id2}/cnotices")]
        [TeacherAuthorization]
        public IHttpActionResult GetCourseNotices([FromUri] int id, [FromUri] int id1, [FromUri] int id2)
        {
            List<CourseNotice> c = courrepo.GetNoticesByClassSectionSubject(id, id1, id2);
            if(c == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(c);

        }

        [Route("classes/{id}/sections/{id1}/subjects/{id2}/cnotices/{id3}", Name ="GetCourseNoticeById")]
        [TeacherAuthorization]
        public IHttpActionResult GetCourseNotice([FromUri] int id, [FromUri] int id1, [FromUri] int id2, [FromUri] int id3)
        {
            CourseNotice c = courrepo.GetNoticeByClassSectionSubject(id, id1, id2, id3);
            {
                if(c == null)
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }

                c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/classes/" + c.classid + "/sections/" + c.sectionid + "/subjects/" + c.subjectid + "/cnotices/" + c.noticeid, HttpMethod = "GET", Relation = "Self" });
                c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/classes/" + c.classid + "/sections/" + c.sectionid + "/subjects/" + c.subjectid + "/cnotices/", HttpMethod = "POST", Relation = "Create Notice" });
                c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/classes/" + c.classid + "/sections/" + c.sectionid + "/subjects/" + c.subjectid + "/cnotices/" + c.noticeid, HttpMethod = "PUT", Relation = "Edit Notice" });
                c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/classes/" + c.classid + "/sections/" + c.sectionid + "/subjects/" + c.subjectid + "/cnotices/" + c.noticeid, HttpMethod = "DELETE", Relation = "Delete Notice" });


                return Ok(c);
            }
        }

        [Route("classes/{id}/sections/{id1}/subjects/{id2}/cnotices")]
        [TeacherAuthorization]
        public IHttpActionResult PostCourseNotice([FromBody] CourseNotice c, [FromUri] int id, [FromUri] int id1, [FromUri] int id2 )
        {
            c.classid = id;
            c.sectionid = id1;
            c.subjectid = id2;
            courrepo.Insert(c);
            string url = Url.Link("GetCourseNoticeById", new { id = c.classid, id1 = c.sectionid, id2 = c.subjectid, id3 = c.noticeid });

            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/classes/" + c.classid + "/sections/" + c.sectionid + "/subjects/" + c.subjectid + "/cnotices/" + c.noticeid, HttpMethod = "GET", Relation = "Get Notice" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/classes/" + c.classid + "/sections/" + c.sectionid + "/subjects/" + c.subjectid + "/cnotices/", HttpMethod = "POST", Relation = "Self" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/classes/" + c.classid + "/sections/" + c.sectionid + "/subjects/" + c.subjectid + "/cnotices/" + c.noticeid, HttpMethod = "PUT", Relation = "Edit Notice" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/classes/" + c.classid + "/sections/" + c.sectionid + "/subjects/" + c.subjectid + "/cnotices/" + c.noticeid, HttpMethod = "DELETE", Relation = "Delete Notice" });


            return Created(url, c);
        }

        [Route("classes/{id}/sections/{id1}/subjects/{id2}/cnotices/{id3}")]
        [TeacherAuthorization]
        public IHttpActionResult PutCourseNotice([FromBody] CourseNotice c, [FromUri] int id, [FromUri] int id1, [FromUri] int id2, [FromUri] int id3)
        {
            c.classid = id;
            c.sectionid = id1;
            c.subjectid = id2;
            c.noticeid = id3;
            courrepo.Edit(c);

            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/classes/" + c.classid + "/sections/" + c.sectionid + "/subjects/" + c.subjectid + "/cnotices/" + c.noticeid, HttpMethod = "GET", Relation = "Get Notice" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/classes/" + c.classid + "/sections/" + c.sectionid + "/subjects/" + c.subjectid + "/cnotices/", HttpMethod = "POST", Relation = "Create Notice" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/classes/" + c.classid + "/sections/" + c.sectionid + "/subjects/" + c.subjectid + "/cnotices/" + c.noticeid, HttpMethod = "PUT", Relation = "Self" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/classes/" + c.classid + "/sections/" + c.sectionid + "/subjects/" + c.subjectid + "/cnotices/" + c.noticeid, HttpMethod = "DELETE", Relation = "Delete Notice" });


            return Ok(c);
        }

        [Route("classes/{id}/sections/{id1}/subjects/{id2}/cnotices/{id3}")]
        [TeacherAuthorization]
        public IHttpActionResult DeleteCourseNotice([FromUri] int id, [FromUri] int id1, [FromUri] int id2, [FromUri] int id3)
        {
            courrepo.Delete(id3);
            return StatusCode(HttpStatusCode.NoContent);
        }

        //HOME WORK

        [Route("sections/{id}/subjects/{id1}/homeworks")]
        //[TeacherAuthorization]
        public IHttpActionResult GetHomeworks([FromUri] int id, [FromUri] int id1)
        {
            List<Homework> h = hrepo.GetHomeworskBySectionSubject(id, id1);
            if(h == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(h);
        }

        [Route("sections/{id}/subjects/{id1}/homeworks/{id2}", Name = "GetHomewrokById")]
        //[TeacherAuthorization]
        public IHttpActionResult GetHomework([FromUri] int id, [FromUri] int id1, [FromUri] int id2)
        {
            Homework h = hrepo.GetHomeworkBySectionSubject(id, id1, id2);
            if(h == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            h.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + h.sectionid + "/subjects/" + h.subjectid + "/homeworks/" + h.homeworkid, HttpMethod = "GET", Relation = "Self" });
            h.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + h.sectionid + "/subjects/" + h.subjectid + "/homeworks/", HttpMethod = "POST", Relation = "Create Homework" });
            h.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + h.sectionid + "/subjects/" + h.subjectid + "/homeworks/" + h.homeworkid, HttpMethod = "PUT", Relation = "Edit Homework" });
            h.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + h.sectionid + "/subjects/" + h.subjectid + "/homeworks/" + h.homeworkid, HttpMethod = "DELETE", Relation = "Delete Homework" });


            return Ok(h);
        }

        [Route("sections/{id}/subjects/{id1}/homeworks")]
        //[TeacherAuthorization]
        public IHttpActionResult PostHomework([FromBody] Homework h, [FromUri] int id, [FromUri] int id1)
        {
            h.sectionid = id;
            h.subjectid = id1;
            hrepo.Insert(h);
            string url = Url.Link("GetHomewrokById", new { id = h.sectionid, id1 = h.subjectid, id2 = h.homeworkid });

            h.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + h.sectionid + "/subjects/" + h.subjectid + "/homeworks/" + h.homeworkid, HttpMethod = "GET", Relation = "Get Homework" });
            h.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + h.sectionid + "/subjects/" + h.subjectid + "/homeworks/", HttpMethod = "POST", Relation = "Self" });
            h.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + h.sectionid + "/subjects/" + h.subjectid + "/homeworks/" + h.homeworkid, HttpMethod = "PUT", Relation = "Edit Homework" });
            h.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + h.sectionid + "/subjects/" + h.subjectid + "/homeworks/" + h.homeworkid, HttpMethod = "DELETE", Relation = "Delete Homework" });


            return Created(url, h);
        }

        [Route("sections/{id}/subjects/{id1}/homeworks/{id2}")]
        //[TeacherAuthorization]
        public IHttpActionResult PutHomework([FromBody] Homework h, [FromUri] int id, [FromUri] int id1, [FromUri] int id2)
        {
            h.sectionid = id;
            h.subjectid = id1;
            h.homeworkid = id2;
            hrepo.Edit(h);

            h.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + h.sectionid + "/subjects/" + h.subjectid + "/homeworks/" + h.homeworkid, HttpMethod = "GET", Relation = "Get Homework" });
            h.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + h.sectionid + "/subjects/" + h.subjectid + "/homeworks/", HttpMethod = "POST", Relation = "Create Homework" });
            h.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + h.sectionid + "/subjects/" + h.subjectid + "/homeworks/" + h.homeworkid, HttpMethod = "PUT", Relation = "Selfk" });
            h.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + h.sectionid + "/subjects/" + h.subjectid + "/homeworks/" + h.homeworkid, HttpMethod = "DELETE", Relation = "Delete Homework" });


            return Ok(h);
        }
        [Route("sections/{id}/subjects/{id1}/homeworks/{id2}")]
        //[TeacherAuthorization]
        public IHttpActionResult DeleteHomework([FromUri] int id2)
        {
            hrepo.Delete(id2);
            return StatusCode(HttpStatusCode.NoContent);
        }

        /*// UPLOAD NOTE

        [Route("sections/{id}/subjects/{id1}/notes")]
        //[TeacherAuthorization]
        public IHttpActionResult GetUploadNote([FromUri] int id, [FromUri] int id1)
        {
            List<UploadNote> up = uprepo.GetUploadNotes(id,id1);
            if(up == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(up);
        }*/

        [Route("sections/{id}/subjects/{id1}/notes/{id2}", Name ="GetUplaodById")]
        //[TeacherAuthorization]
        public IHttpActionResult GetUploadNote([FromUri] int id, [FromUri] int id1, [FromUri] int id2)
        {
            UploadNote up = uprepo.GetUploadNote(id, id1, id2);
            if (up == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            up.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + up.sectionid + "/subjects/" + up.subjectid + "/notes/" + up.uploadid, HttpMethod = "GET", Relation = "Self" });
            up.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + up.sectionid + "/subjects/" + up.subjectid + "/notes/", HttpMethod = "POST", Relation = "Create Notes" });
            up.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + up.sectionid + "/subjects/" + up.subjectid + "/notes/" + up.uploadid, HttpMethod = "PUT", Relation = "Edit Notes" });
            up.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/teachers/sections/" + up.sectionid + "/subjects/" + up.subjectid + "/notes/" + up.uploadid, HttpMethod = "DELETE", Relation = "Delete Notes" });


            return Ok(up);
        }

        /*[Route("sections/{id}/subjects/{id1}/notes")]
        //[TeacherAuthorization]
        public IHttpActionResult PostUploadNote([FromBody] UploadNote up, [FromUri] int id, [FromUri] int id1 )
        {
            up.sectionid = id;
            up.subjectid = id1;
            uprepo.Insert(up);
            string url = Url.Link("GetUplaodById", new { id = up.sectionid, id1 = up.subjectid, id2 = up.uploadid });
            return Created(url, up);
        }

        [Route("sections/{id}/subjects/{id1}/notes/{id2}")]
        //[TeacherAuthorization]
        public IHttpActionResult PutUploadNote([FromBody] UploadNote up, [FromUri] int id, [FromUri] int id1, [FromUri] int id2)
        {
            up.sectionid = id;
            up.subjectid = id1;
            up.uploadid = id2;
            uprepo.Edit(up);
            return Ok(up);
        }

        [Route("sections/{id}/subjects/{id1}/notes/{id2}")]
        //[TeacherAuthorization]
        public IHttpActionResult DeleteUploadNote([FromUri] int id2)
        {
            uprepo.Delete(id2);
            return StatusCode(HttpStatusCode.NoContent);
        }*/

        // GET CLASSES OF CURRENT TEACHER
        [Route("{id}/classes")]
        //[TeacherAuthorization]
        public IHttpActionResult Getteacherclass([FromUri] string id)
        {
            List<Class> TeacherClasses = trepo.GetClasses(id);
            if (TeacherClasses == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(TeacherClasses);
        }

        // GET SECTIONS OF CURRENT TEACHER
        [Route("{id}/sections")]
        //[TeacherAuthorization]
        public IHttpActionResult Getteachersection([FromUri] string id)
        {
            List<Section> TeacherSection = trepo.GetSections(id);
            if (TeacherSection == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(TeacherSection);
        }

        // GET SUBJECTS OF CURRENT TEACHER
        [Route("{id}/subjects")]
        //[TeacherAuthorization]
        public IHttpActionResult Getteachersubject([FromUri] int id)
        {
            List<Subject> TeacherSubject = trepo.GetSubjects(id);
            if (TeacherSubject == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(TeacherSubject);
        }

        //GET ALL SELECTED ASSIGNMENTS

        [Route("sections/{id}/subjects/{id2}/assignments/{id3}")]
        //[TeacherAuthorization]
        public IHttpActionResult GetALLAssignments([FromUri] int id, [FromUri] int id2, [FromUri] int id3)
        {
            List<Assignment_t> t = ass_t_repo.GetAssignmentsBySubjectsBySections(id, id2);
            if (t == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            List<Assignment_s> s = ass_s_repo.GetSubmission(id3);
            if (s == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            Assignment_View_Model Model = new Assignment_View_Model(t,s);

            return Ok(Model);
        }

        //Get Student of Current class,section
        [Route("classes/{id}/sections/{id2}/students")]
        public IHttpActionResult GetStudentList([FromUri] int id,[FromUri] int id2)
        {
            List<Student> s = trepo.GetList(id, id2);
            return Ok(s);
        }

        // UPLOAD NOTES



        [Route("sections/{id}/subjects/{id2}/notes/{id3}")]
        //[TeacherAuthorization]
        public IHttpActionResult PostNotes([FromUri] int id, [FromUri] int id2, [FromUri] string id3)
        {
            UploadNote a = new UploadNote();



            string dir = HttpContext.Current.Server.MapPath("~/Uploads/ClassNotes/Teachers/" + id3 + id + id2 + "/");
            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }



            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var file = HttpContext.Current.Request.Files["UploadFile"];
                if (file != null)
                {
                    var savefile = Path.Combine(HttpContext.Current.Server.MapPath("~/Uploads/ClassNotes/Teachers/" + id3 + id + id2 + "/"), file.FileName);
                    a.filename = file.FileName;
                    a.directory = "~/Uploads/ClassNotes/Teachers/" + id3 + id + id2 + "/";
                    file.SaveAs(savefile);
                }
            }



            return Ok();



        }



        [Route("sections/{id}/subjects/{id2}/notes/{id3}/db/")] //20-0000-03
        //[TeacherAuthorization]
        public IHttpActionResult PostNotesDB(UploadNote a, [FromUri] int id, [FromUri] int id2, [FromUri] string id3)
        {
            a.sectionid = id;
            a.subjectid = id2;
            a.directory = "/Uploads/ClassNotes/Teachers/" + id3 + id + id2 + "/";
            uprepo.Insert(a);
            /*string url = Url.Link("GetUplaodById", new { id = a.sectionid, id2 = a.subjectid, id3 = a.uploadid });
            return Created(url, a);*/
            return Ok();
        }



        [Route("sections/{id}/subjects/{id2}/notes/{id3}")]
        //[TeacherAuthorization]
        public IHttpActionResult PutNotes([FromBody] UploadNote a, [FromUri] int id, [FromUri] int id2, [FromUri] int id3)
        {
            a.sectionid = id;
            a.subjectid = id2;
            a.uploadid = id3;
            uprepo.Edit(a);


            return Ok(a);
        }



        [Route("sections/{id}/subjects/{id2}/notes/{id3}")]
        //[TeacherAuthorization]
        public IHttpActionResult DeleteNotes([FromUri] int id, [FromUri] int id2, [FromUri] int id3)
        {
            uprepo.Delete(id3);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
