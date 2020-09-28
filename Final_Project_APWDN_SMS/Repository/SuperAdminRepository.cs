using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    public class SuperAdminRepository:Repository<SuperAdmin>,ISuperAdminRepository
    {
        public string GetNewID()
        {
            var oldID = (from Admins in data.Admins
                         orderby
                         Admins.id descending
                         select Admins.adminid).Take(1).FirstOrDefault();

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

        public SuperAdmin GetInfo(string id)
        {
            return this.data.SuperAdmins.Where(x => x.superadminid == id).FirstOrDefault();
        }

        public void ManualUpdate(SuperAdmin sp, string id)
        {
            SuperAdmin S = data.SuperAdmins.Where(a => a.superadminid == sp.superadminid).FirstOrDefault();
            S.superadminid = id;
            S.superadminname = sp.superadminname;
            S.superadminpassword = sp.superadminpassword;
            data.SaveChanges();
        }
    }
}