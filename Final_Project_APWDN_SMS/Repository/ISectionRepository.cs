using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Final_Project_APWDN_SMS.Repository
{
    interface ISectionRepository
    {
        List<Section> GetSectionsByClass(int id);

        Section GetSectionByClass(int id, int id2);
    }
}
