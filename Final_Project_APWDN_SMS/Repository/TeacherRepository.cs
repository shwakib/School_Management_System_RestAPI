using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    public class TeacherRepository:Repository<Teacher>,ITeacherRepository
    {
        public List<Class> GetClasses(string id)
        {
            List<int> T = data.Teachers.Where(x => x.teacherid == id).Select(x => x.classid).ToList();

            List<Class> C = new List<Class>();

            foreach (int element in T)
            {
                C.Add((data.Classes.Where(x => x.classid == element).FirstOrDefault()));
            }

            return C;
        }

        public List<Section> GetSections(string id)
        {
            Teacher T = data.Teachers.Where(x => x.teacherid == id).FirstOrDefault();

            return this.data.Sections.Where(x => x.sectionid == T.sectionid).ToList();
        }

        public List<Subject> GetSubjects(int id)
        {
            return this.data.Subjects.Where(x => x.classid == id).ToList();
        }

        public Teacher GetInfo(string id)
        {
            return this.data.Teachers.Where(x => x.teacherid == id).FirstOrDefault();
        }

        public void ManualUpdate(Teacher t, string id)
        {
            Teacher S = data.Teachers.Where(a => a.teacherid == id).FirstOrDefault();
            S.teacherid = id;
            S.teachername = t.teachername;
            S.teacherpassword = t.teacherpassword;
            S.teacherbloodgroup = t.teacherbloodgroup;
            S.teacheremail = t.teacheremail;
            S.teacherphone = t.teacherphone;
            data.SaveChanges();
        }

        public List<Student> GetList(int id,int id2)
        {
            return this.data.Students.Where(x => x.classid == id && x.sectionid == id2).ToList();
        }
    }
}