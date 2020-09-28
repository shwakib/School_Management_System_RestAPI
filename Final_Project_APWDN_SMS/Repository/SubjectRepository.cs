using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    public class SubjectRepository:Repository<Subject>, ISubjectRepository
    {
        public List<Subject> GetSubjectsByClass(int id)
        {
            return this.data.Subjects.Where(x => x.classid == id).ToList();
        }

        public Subject GetSubjectByClass(int id, int id2)
        {
            return this.data.Subjects.Where(x => x.classid == id && x.subjectid == id2).FirstOrDefault();
        }
    }
}