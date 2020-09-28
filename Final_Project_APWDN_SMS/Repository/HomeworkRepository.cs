using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    public class HomeworkRepository : Repository<Homework>, IHomeWorkRepository
    {
        public Homework GetHomeworkBySectionSubject(int id, int id1, int id2)
        {
            return this.data.Homeworks.Where(x => x.sectionid == id && x.subjectid == id1 && x.homeworkid == id2).FirstOrDefault();
        }

        public List<Homework> GetHomeworskBySectionSubject(int id, int id1)
        {
            return this.data.Homeworks.Where(x => x.sectionid == id && x.subjectid == id1).ToList();
        }
    }
}