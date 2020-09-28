using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Final_Project_APWDN_SMS.Repository
{
    interface IHomeWorkRepository
    {
        List<Homework> GetHomeworskBySectionSubject(int id, int id1);
        Homework GetHomeworkBySectionSubject(int id, int id1, int id2);
    }
}
