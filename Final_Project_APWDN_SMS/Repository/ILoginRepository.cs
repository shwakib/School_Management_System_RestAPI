using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    interface ILoginRepository
    {
        int ValidateSuper(string userid, string userpass);

        int ValidateAdmin(string userid, string userpass);

        int ValidateTeacher(string userid, string userpass);

        int ValidateStudent(string userid, string userpass);

        string checkUserID(string id);
    }
}