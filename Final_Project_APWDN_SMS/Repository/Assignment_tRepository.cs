using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    public class Assignment_tRepository:Repository<Assignment_t>, IAssignment_tRepository
    {
        public List<Assignment_t> GetAssignmentsBySubjectsBySections(int id, int id2)
        {
            return this.data.Assignments_t.Where(x => x.sectionid == id && x.subjectid == id2).ToList();
        }

        public Assignment_t GetAssignmentBySubjectsBySections(int id, int id2, int id3)
        {
            return this.data.Assignments_t.Where(x => x.sectionid == id && x.subjectid == id2 && x.assignmentid == id3).FirstOrDefault();
        }
    }
}