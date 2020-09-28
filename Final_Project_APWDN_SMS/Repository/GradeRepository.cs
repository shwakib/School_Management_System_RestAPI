using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    public class GradeRepository:Repository<Grade>, IGradeRepository
    {
        public List<Grade> GetGradesBySectionsBySubjects(int id, int id2)
        {
            return this.data.Grades.Where(x => x.sectionid == id && x.subjectid == id2).ToList();
        }

        public Grade GetGradeBySectionsBySubjects(int id, string id2, int id3)
        {
            return this.data.Grades.Where(x => x.sectionid == id && x.studentid == id2 && x.subjectid == id3).FirstOrDefault();
        }
    }
}