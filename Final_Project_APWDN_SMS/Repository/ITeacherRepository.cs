using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Final_Project_APWDN_SMS.Repository
{
    interface ITeacherRepository
    {
        List<Class> GetClasses(string id);

        List<Section> GetSections(string id);

        List<Subject> GetSubjects(int id);

        void ManualUpdate(Teacher t, string id);

        List<Student> GetList(int id, int id2);
    }
}
