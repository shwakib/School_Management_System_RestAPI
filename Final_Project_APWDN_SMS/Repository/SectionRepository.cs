using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace Final_Project_APWDN_SMS.Repository
{
    public class SectionRepository: Repository<Section>,ISectionRepository
    {
        public List<Section> GetSectionsByClass(int id)
        {
            return this.data.Sections.Where(x => x.classid == id).ToList();
        }

        public Section GetSectionByClass(int id, int id2)
        {
            return this.data.Sections.Where(x => x.classid == id && x.sectionid == id2).FirstOrDefault();
        }
    }
}