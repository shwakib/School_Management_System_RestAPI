using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    public class AdminRepository:Repository<Admin>,IAdminrepository
    {
        public string GetNewTeacherID()
        {
            var oldID = (from Teachers in data.Teachers
                         orderby
                         Teachers.id descending
                         select Teachers.teacherid).Take(1).FirstOrDefault();

            string toBreak = oldID.ToString();
            string[] idList = toBreak.Split('-');//20-0000-01

            string id1 = idList[0];

            string id2 = idList[1];

            string id3 = idList[2];

            int idInc = Convert.ToInt32(id2);
            idInc = idInc + 1;
            id2 = idInc.ToString("D" + 4);
            string newID = id1 + "-" + id2 + "-" + id3;
            return newID;
        }

        public string GetNewStudentID()
        {
            var oldID = (from Students in data.Students
                         orderby
                         Students.id descending
                         select Students.studentid).Take(1).FirstOrDefault();

            string toBreak = oldID.ToString();
            string[] idList = toBreak.Split('-');//20-0000-01

            string id1 = idList[0];

            string id2 = idList[1];

            string id3 = idList[2];

            int idInc = Convert.ToInt32(id2);
            idInc = idInc + 1;
            id2 = idInc.ToString("D" + 4);
            string newID = id1 + "-" + id2 + "-" + id3;
            return newID;
        }

        public Admin GetInfo(string id)
        {
            return this.data.Admins.Where(x => x.adminid == id).FirstOrDefault();
        }

        public void ManualUpdate(Admin ad, string id)
        {
            Admin A = data.Admins.Where(a => a.adminid == id).FirstOrDefault();
            A.adminid = id;
            A.adminname = ad.adminname;
            A.adminpassword = ad.adminpassword;
            data.SaveChanges();
        }
    }
}