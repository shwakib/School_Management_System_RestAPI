using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    interface IAssignment_sRepository
    {
        List<Assignment_s> GetSubmission(int id);

        Class GetClass(string id);
    }
}