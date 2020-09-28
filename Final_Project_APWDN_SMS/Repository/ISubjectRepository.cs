using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Final_Project_APWDN_SMS.Repository
{
    interface ISubjectRepository
    {
        List<Subject> GetSubjectsByClass(int id);

        Subject GetSubjectByClass(int id, int id2);

    }
}
