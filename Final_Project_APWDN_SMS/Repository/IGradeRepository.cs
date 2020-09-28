using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    interface IGradeRepository
    {
        List<Grade> GetGradesBySectionsBySubjects(int id, int id2);

        Grade GetGradeBySectionsBySubjects(int id, string id2, int id3);
    }
}