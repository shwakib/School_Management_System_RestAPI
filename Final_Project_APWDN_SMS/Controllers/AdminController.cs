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
    [RoutePrefix("api/admins")]
    public class AdminController : ApiController
    {
        AdminRepository adrepo = new AdminRepository();
        TeacherRepository trepo = new TeacherRepository();
        SubjectRepository subrepo = new SubjectRepository();
        StudentRepository studrepo = new StudentRepository();
        SectionRepository secrepo = new SectionRepository();
        ClassRepository classrepo = new ClassRepository();
        GeneralNoticeRepository grepo = new GeneralNoticeRepository();
        SMSDataContext data = new SMSDataContext();

        // ADMIN

        [Route("{id}")]
        [AdminAuthorization]
        public IHttpActionResult GetAdmin(string id)
        {
            Admin a = adrepo.GetInfo(id);
            if (a == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/" + a.adminid, HttpMethod = "GET", Relation = "Self" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/" + a.id, HttpMethod = "GET", Relation = "Get Admnin" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/" + a.adminid, HttpMethod = "PUT", Relation = "Edit Admin" });
            return Ok(a);
        }

        [Route("{id}/specify", Name = "GetAdminById")]
        [AdminAuthorization]
        public IHttpActionResult GetAdmin(int id)
        {
            Admin a = adrepo.GetByID(id);
            if (a == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(a);
        }

        [Route("{id}")]
        [AdminAuthorization]
        public IHttpActionResult PutAdmin([FromBody] Admin a, [FromUri] string id)
        {
            adrepo.ManualUpdate(a, id);


            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/" + a.adminid, HttpMethod = "GET", Relation = "Get Admin by ID" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/" + a.id, HttpMethod = "GET", Relation = "Get Admnin" });
            a.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/" + a.adminid, HttpMethod = "PUT", Relation = "Self" });


            return Ok(a);
        }

        //TEACHER

        [Route("teachers")]
        [AdminAuthorization]
        public IHttpActionResult GetTeacher()
        {
            return Ok(trepo.GetAll());
        }

       [Route("teachers/{id}",Name="GetteacherById")]
        [AdminAuthorization]
        public IHttpActionResult GetTeacher(int id)
        {
            Teacher t = trepo.GetByID(id);
            if(t == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/teachers/" + t.id, HttpMethod = "GET", Relation = "Self" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/teachers/", HttpMethod = "POST", Relation = "Create Teacher" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/teachers/" + t.id, HttpMethod = "PUT", Relation = "Edit Teacher" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/teachers/" + t.id, HttpMethod = "DELETE", Relation = "Delete Teacher" });


            return Ok(t);
        }

        [Route("teachers")]
        [AdminAuthorization]
        public IHttpActionResult Post(Teacher t)
        {
            trepo.Insert(t);
            string url = Url.Link("GetTeacherById", new { id = t.teacherid });

            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/teachers/" + t.id, HttpMethod = "GET", Relation = "Get Teacher" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/teachers/", HttpMethod = "POST", Relation = "Self" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/teachers/" + t.id, HttpMethod = "PUT", Relation = "Edit Teacher" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/teachers/" + t.id, HttpMethod = "DELETE", Relation = "Delete Teacher" });


            return Created(url, t);
        }

        [Route("teachers/{id}")]
        [AdminAuthorization]
        public IHttpActionResult PutTeacher([FromBody] Teacher t, [FromUri] int id)
        {
            t.id = id;
            trepo.Edit(t);

            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/teachers/" + t.id, HttpMethod = "GET", Relation = "Get Teacher" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/teachers/", HttpMethod = "POST", Relation = "Create Teacher" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/teachers/" + t.id, HttpMethod = "PUT", Relation = "Self" });
            t.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/teachers/" + t.id, HttpMethod = "DELETE", Relation = "Delete Teacher" });


            return Ok(t);
        }

        [Route("teachers/{id}")]
        [AdminAuthorization]
        public IHttpActionResult DeleteTecher(int id)
        {
            trepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }

        //STUDENT

        [Route("students")]
        [AdminAuthorization]
        public IHttpActionResult GetStudent()
        {
            return Ok(studrepo.GetAll());
        }


        [Route("students/{id}", Name ="GetStudentById")]
        [AdminAuthorization]
        public IHttpActionResult GetStudent(int id)
        {
            Student s = studrepo.GetByID(id);
            if (s ==  null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/students/" + s.id, HttpMethod = "GET", Relation = "Self" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/students/", HttpMethod = "POST", Relation = "Create Student" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/students/" + s.id, HttpMethod = "PUT", Relation = "Edit Student" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/students/" + s.id, HttpMethod = "DELETE", Relation = "Delete Student" });


            return Ok(s);
        }


        [Route("students")]
        [AdminAuthorization]
        public IHttpActionResult PostStudent(Student s)
        {
            studrepo.Insert(s);
            string url = Url.Link("GetStudentById", new { id = s.studentid });

            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/students/" + s.id, HttpMethod = "GET", Relation = "Get Student" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/students/", HttpMethod = "POST", Relation = "Self" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/students/" + s.id, HttpMethod = "PUT", Relation = "Edit Student" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/students/" + s.id, HttpMethod = "DELETE", Relation = "Delete Student" });


            return Created(url, s);
        }


        [Route("students/{id}")]
        [AdminAuthorization]
        public IHttpActionResult PutStudent([FromBody] Student s,[FromUri] int id)
        {
            s.id = id;
            studrepo.Edit(s);

            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/students/" + s.id, HttpMethod = "GET", Relation = "Get Student" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/students/", HttpMethod = "POST", Relation = "Create Student" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/students/" + s.id, HttpMethod = "PUT", Relation = "Self" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/students/" + s.id, HttpMethod = "DELETE", Relation = "Delete Student" });


            return Ok(s);
        }


        [Route("students/{id}")]
        [AdminAuthorization]
        public IHttpActionResult DeleteStudent(int id)
        {
            studrepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }

        //CLASS

        [Route("classes")]
        [AdminAuthorization]
        public IHttpActionResult GetClass()
        {
            return Ok(classrepo.GetAll());
        }

        [Route("classes/{id}", Name ="GetClassById")]
        [AdminAuthorization]
        public IHttpActionResult GetClass(int id)
        {
            Class c = classrepo.GetByID(id);
            if (c == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }


            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + c.classid, HttpMethod = "GET", Relation = "Self" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/", HttpMethod = "POST", Relation = "Create Class" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + c.classid, HttpMethod = "PUT", Relation = "Edit Class" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + c.classid, HttpMethod = "Delete", Relation = "Delete Class" });


            return Ok(c);
        }


        [Route("classes")]
        [AdminAuthorization]
        public IHttpActionResult PostClass(Class c)
        {
            classrepo.Insert(c);
            string url = Url.Link("GetClassById", new { id = c.classid });

            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + c.classid, HttpMethod = "GET", Relation = "Get Class" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/", HttpMethod = "POST", Relation = "Self" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + c.classid, HttpMethod = "PUT", Relation = "Edit Class" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + c.classid, HttpMethod = "Delete", Relation = "Delete Class" });


            return Created(url, c);

        }


        [Route("classes/{id}")]
        [AdminAuthorization]
        public IHttpActionResult PutClass([FromBody] Class c, [FromUri] int id)
        {
            c.classid = id;
            classrepo.Edit(c);

            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + c.classid, HttpMethod = "GET", Relation = "Self" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/", HttpMethod = "POST", Relation = "Create Class" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + c.classid, HttpMethod = "PUT", Relation = "Edit Class" });
            c.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + c.classid, HttpMethod = "Delete", Relation = "Delete Class" });


            return Ok(c);
        }

        [Route("classes/{id}")]
        [AdminAuthorization]
        public IHttpActionResult DeleteClass(int id)
        {
            classrepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }


        //SECTION

        [Route("classes/{id}/sections")]
        [AdminAuthorization]
        public IHttpActionResult GetSections([FromUri] int id)
        {
            List<Section> s = secrepo.GetSectionsByClass(id);
            if (s == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(s);
        }

        [Route("classes/{id}/sections/{id2}", Name = "GetSectionById")]
        [AdminAuthorization]
        public IHttpActionResult GetSection([FromUri] int id, [FromUri] int id2)
        {
            Section s = secrepo.GetSectionByClass(id, id2);
            if (s == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/sections/" + s.sectionid, HttpMethod = "GET", Relation = "Self" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/sections/", HttpMethod = "POST", Relation = "Create Section" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/sections/" + s.sectionid, HttpMethod = "PUT", Relation = "Edit Section" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/sections/" + s.sectionid, HttpMethod = "DELETE", Relation = "Delete Section" });


            return Ok(s);
        }

        [Route("classes/{id}/sections")]
        [AdminAuthorization]
        public IHttpActionResult PostSection(Section s, [FromUri] int id)
        {
            s.classid = id;
            secrepo.Insert(s);
            string url = Url.Link("GetSectionById", new { id = s.classid, id2 = s.sectionid });

            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/sections/" + s.sectionid, HttpMethod = "GET", Relation = "gET sECTION" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/sections/", HttpMethod = "POST", Relation = "sELF" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/sections/" + s.sectionid, HttpMethod = "PUT", Relation = "Edit Section" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/sections/" + s.sectionid, HttpMethod = "DELETE", Relation = "Delete Section" });


            return Created(url, s);
        }

        [Route("classes/{id}/sections/{id2}")]
        [AdminAuthorization]
        public IHttpActionResult PutSection([FromBody] Section s, [FromUri] int id, [FromUri] int id2)
        {
            s.classid = id;
            s.sectionid = id2;
            secrepo.Edit(s);

            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/sections/" + s.sectionid, HttpMethod = "GET", Relation = "Get Section" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/sections/", HttpMethod = "POST", Relation = "Create Section" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/sections/" + s.sectionid, HttpMethod = "PUT", Relation = "Edit Section" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/sections/" + s.sectionid, HttpMethod = "DELETE", Relation = "Delete Section" });


            return Ok(s);
        }

        [Route("classes/{id}/sections/{id2}")]
        [AdminAuthorization]
        public IHttpActionResult DeleteSection([FromUri] int id, [FromUri] int id2)
        {
            secrepo.Delete(id2);
            return StatusCode(HttpStatusCode.NoContent);
        }

        //SUBJECT

        [Route("classes/{id}/subjects")]
        [AdminAuthorization]
        public IHttpActionResult GetSubjects([FromUri] int id)
        {
            List<Subject> s = subrepo.GetSubjectsByClass(id);
            if (s == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(s);
        }

        [Route("classes/{id}/subjects/{id2}", Name = "GetSubjectById")]
        [AdminAuthorization]
        public IHttpActionResult GetSubject([FromUri] int id, [FromUri] int id2)
        {
            Subject s = subrepo.GetSubjectByClass(id, id2);
            if (s == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/subjects/" + s.subjectid, HttpMethod = "GET", Relation = "Self" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/subjects/", HttpMethod = "POST", Relation = "Create Section" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/subjects/" + s.subjectid, HttpMethod = "PUT", Relation = "Edit Section" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/subjects/" + s.subjectid, HttpMethod = "DELETE", Relation = "Delete Section" });


            return Ok(s);
        }

        [Route("classes/{id}/subjects")]
        [AdminAuthorization]
        public IHttpActionResult PostSubject([FromBody] Subject s, [FromUri] int id)
        {
            s.classid = id;
            subrepo.Insert(s);
            string url = Url.Link("GetSubjectById", new { id = s.classid, id2 = s.subjectid });

            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/subjects/" + s.subjectid, HttpMethod = "GET", Relation = "Get Subject" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/subjects/", HttpMethod = "POST", Relation = "Self" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/subjects/" + s.subjectid, HttpMethod = "PUT", Relation = "Edit Section" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/subjects/" + s.subjectid, HttpMethod = "DELETE", Relation = "Delete Section" });


            return Created(url, s);
        }

        [Route("classes/{id}/subjects/{id2}")]
        [AdminAuthorization]
        public IHttpActionResult PutSubject([FromBody] Subject s, [FromUri] int id, [FromUri] int id2)
        {
            s.classid = id;
            s.subjectid = id2;
            subrepo.Edit(s);


            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/subjects/" + s.subjectid, HttpMethod = "GET", Relation = "Get Subject" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/subjects/", HttpMethod = "POST", Relation = "Create Section" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/subjects/" + s.subjectid, HttpMethod = "PUT", Relation = "Self" });
            s.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/classes/" + s.classid + "/subjects/" + s.subjectid, HttpMethod = "DELETE", Relation = "Delete Section" });


            return Ok(s);
        }

        [Route("classes/{id}/subjects/{id2}")]
        [AdminAuthorization]
        public IHttpActionResult Deletesubject([FromUri] int id, [FromUri] int id2)
        {
            subrepo.Delete(id2);
            return StatusCode(HttpStatusCode.NoContent);
        }


        //GET NEW TEACHER ID FOR CREATE

        [Route("teachers/new")]
        [AdminAuthorization]
        public IHttpActionResult GetNewTeacherID()
        {
            return Ok(adrepo.GetNewTeacherID());
        }


        //GET NEW STUDENT ID FOR CREATE

        [Route("students/new")]
        [AdminAuthorization]
        public IHttpActionResult GetNewStudentID()
        {
            return Ok(adrepo.GetNewStudentID());
        }


        //GENERAL NOTICES


        [Route("gnotices")]
        //[AdminAuthorization]
        public IHttpActionResult GetGeneralNotices()
        {
           List<GeneralNotice> g = grepo.GetAll();
            return Ok(g);
        }

        [Route("gnotices/{id}", Name ="GetGeneralNoticeById")]
        //[AdminAuthorization]
        public IHttpActionResult GetGeneralNotice(int id)
        {
            GeneralNotice g = grepo.GetByID(id);
            if (g == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/gnotices/" + g.noticeid, HttpMethod = "GET", Relation = "Self" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/gnotices/", HttpMethod = "POST", Relation = "Create General Notice" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/gnotices/" + g.noticeid, HttpMethod = "PUT", Relation = "Edit general notice" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/gnotices/" + g.noticeid, HttpMethod = "Delete", Relation = "Delete General Notice" });


            return Ok(g);
        }

        [Route("gnotices")]
        [AdminAuthorization]
        public IHttpActionResult PostGeneralNotice(GeneralNotice g)
        {
            grepo.Insert(g);
            string url = Url.Link("GetGeneralNoticeById", new { id = g.noticeid });

            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/gnotices/" + g.noticeid, HttpMethod = "GET", Relation = "Get General notice" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/gnotices/", HttpMethod = "POST", Relation = "Self" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/gnotices/" + g.noticeid, HttpMethod = "PUT", Relation = "Edit general notice" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/gnotices/" + g.noticeid, HttpMethod = "Delete", Relation = "Delete General Notice" });


            return Created(url, g);
        }

        [Route("gnotices/{id}")]
        [AdminAuthorization]
        public IHttpActionResult PutGeneralNotice([FromBody] GeneralNotice g, [FromUri] int id)
        {
            g.noticeid = id;
            grepo.Edit(g);

            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/gnotices/" + g.noticeid, HttpMethod = "GET", Relation = "Get geenral Notice" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/gnotices/", HttpMethod = "POST", Relation = "Create General Notice" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/gnotices/" + g.noticeid, HttpMethod = "PUT", Relation = "Self" });
            g.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:44347/api/admins/gnotices/" + g.noticeid, HttpMethod = "Delete", Relation = "Delete General Notice" });


            return Ok(g);
        }


        [Route("gnotices/{id}")]
        [AdminAuthorization]
        public IHttpActionResult DeleteGeneralNotice(int id)
        {
            grepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }


        //URI TO GET ALL CLASSES & SECTIONS


        [Route("classes/sections")]
        [AdminAuthorization]
        public IHttpActionResult GetAllClassesSections()
        {
            List<Section> s = secrepo.GetAll();
            if (s == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(s);
        }

        /// <summary>
        /// -- -- -- REPORTING URI
        /// </summary>
        /// <returns></returns>

        [Route("reports/teachercount")]
        public IHttpActionResult GetTeacherCount()
        {
            var teachercount = (from teacher in data.Teachers select teacher.teacherid).Count();

            int teacher_count = Convert.ToInt32(teachercount);

            return Ok(teachercount);
        }



        [Route("reports/teacherSalary")]
        public IHttpActionResult GetTeacherSalary()
        {
            var teachersalary = (from teacher in data.Teachers select teacher.teachersalary).Sum();

            int teacher_salary = Convert.ToInt32(teachersalary);

            return Ok(teachersalary);
        }



        [Route("reports/studentfee")]
        public IHttpActionResult GetStudentFee()
        {
            var studentfee = (from student in data.Students select student.studentfees).Sum();

            int student_fee = Convert.ToInt32(studentfee);

            return Ok(student_fee);
        }



        [Route("reports/studentcount")]
        public IHttpActionResult GetStudentCount()
        {
            var studentcount = (from student in data.Students select student.sectionid).Count();

            int student_count = Convert.ToInt32(studentcount);

            return Ok(studentcount);
        }

    }
}
