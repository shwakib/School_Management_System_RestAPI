using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
    public class CourseNoticeRepository : Repository<CourseNotice>, ICourseNoticeRepository
    {
        public CourseNotice GetNoticeByClassSectionSubject(int id, int id1, int id2, int id3)
        {
            return this.data.CourseNotices.Where(x => x.classid == id && x.sectionid == id1 && x.subjectid == id2 && x.noticeid == id3).FirstOrDefault();
        }

        public List<CourseNotice> GetNoticesByClassSectionSubject(int id, int id1, int id2)
        {
            return this.data.CourseNotices.Where(x => x.classid == id && x.sectionid == id1 && x.subjectid == id2).ToList();
        }
    }
}