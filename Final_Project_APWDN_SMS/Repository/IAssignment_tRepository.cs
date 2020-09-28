using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    interface IAssignment_tRepository
    {
        List<Assignment_t> GetAssignmentsBySubjectsBySections(int id, int id2);

        Assignment_t GetAssignmentBySubjectsBySections(int id, int id2, int id3);
    }
}