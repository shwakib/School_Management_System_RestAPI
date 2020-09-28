using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class Assignment_View_Model
    {
        public Assignment_View_Model(List<Assignment_t> t, List<Assignment_s> s)
        {
            Assignment_t = t;
            Assignment_s = s;
        }
        public List<Assignment_t> Assignment_t;
        public List<Assignment_s> Assignment_s;
        
    }
}