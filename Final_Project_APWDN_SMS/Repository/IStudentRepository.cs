using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    interface IStudentRepository
    {
        Student GetInfo(string id);

        Section GetSection(string id);

        void ManualUpdate(Student s, string id);
    }
}