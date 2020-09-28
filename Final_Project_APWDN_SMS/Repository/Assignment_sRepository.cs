using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    public class Assignment_sRepository:Repository<Assignment_s>, IAssignment_sRepository
    {
        public List<Assignment_s> GetSubmission(int id)
        {
            return this.data.Assignments_s.Where(x => x.assignmentid_t == id).ToList();    
        }

        public Class GetClass(string id)
        {
            Student S = data.Students.Where(x => x.studentid == id).FirstOrDefault();

            return this.data.Classes.Where(x => x.classid == S.classid).FirstOrDefault();
        }
    }
}