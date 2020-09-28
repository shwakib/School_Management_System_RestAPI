using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    public class LoginRepository:Repository<Login>,ILoginRepository
    {
        public int ValidateSuper(string userid, string userpass)
        {
            var u = data.SuperAdmins.Where(x => x.superadminpassword == userpass && x.superadminid == userid).FirstOrDefault();
            if (u != null)
            {
                return u.id;
            }
            else
            {
                return 0;
            }
        }

        public int ValidateAdmin(string userid, string userpass)
        {
            var u = data.Admins.Where(x => x.adminpassword == userpass && x.adminid == userid).FirstOrDefault();
            if (u != null)
            {
                return u.id;
            }
            else
            {
                return 0;
            }
        }

        public int ValidateTeacher(string userid, string userpass)
        {
            var u = data.Teachers.Where(x => x.teacherpassword == userpass && x.teacherid == userid).FirstOrDefault();
            if (u != null)
            {
                return u.id;
            }
            else
            {
                return 0;
            }
        }

        public int ValidateStudent(string userid, string userpass)
        {
            var u = data.Students.Where(x => x.studentpassword == userpass && x.studentid == userid).FirstOrDefault();
            if (u != null)
            {
                return u.id;
            }
            else
            {
                return 0;
            }
        }

        public string checkUserID(string id)
        {
            string[] idList = id.Split('-');
            string id3 = idList[2];
            return id3;   //20-0000-01 20-0000-02 20-0000-03 20-0000-04 
        }
    }
}