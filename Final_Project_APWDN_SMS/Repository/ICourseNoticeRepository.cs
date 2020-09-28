using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Final_Project_APWDN_SMS.Repository
{
    interface ICourseNoticeRepository
    {
        List<CourseNotice> GetNoticesByClassSectionSubject(int id, int id1, int id2);
        CourseNotice GetNoticeByClassSectionSubject(int id, int id1, int id2, int id3);
    }
}
