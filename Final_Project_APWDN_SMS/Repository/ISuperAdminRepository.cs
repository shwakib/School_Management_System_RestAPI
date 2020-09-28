using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Final_Project_APWDN_SMS.Repository
{
    interface ISuperAdminRepository
    {
        string GetNewID();

        SuperAdmin GetInfo(string id);

        void ManualUpdate(SuperAdmin sp, string id);
    }
}
