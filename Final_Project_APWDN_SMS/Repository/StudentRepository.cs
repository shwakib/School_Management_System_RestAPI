using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    public class StudentRepository: Repository<Student>,IStudentRepository
    {
        public Student GetInfo(string id)
        {
            return this.data.Students.Where(x => x.studentid == id).FirstOrDefault();
        }

        public Section GetSection(string id)
        { 
            Student s = data.Students.Where(x => x.studentid == id).FirstOrDefault();

            return this.data.Sections.Where(x => x.sectionid == s.sectionid).FirstOrDefault();
        }

        public void ManualUpdate(Student s, string id)
        {
            Student Stud = data.Students.Where(a => a.studentid == id).FirstOrDefault();
            Stud.studentid = id;
            Stud.studentname = s.studentname;
            Stud.studentpassword = s.studentpassword;
            Stud.studentdob = s.studentdob;
            Stud.studentphone = s.studentphone;
            Stud.studentaddress = s.studentaddress;
            Stud.studentemail = s.studentemail;
            Stud.studentbloodgroup = s.studentbloodgroup;

            data.SaveChanges();
        }

    }
}