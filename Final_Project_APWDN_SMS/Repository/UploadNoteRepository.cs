using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Final_Project_APWDN_SMS.Repository
{
    public class UploadNoteRepository : Repository<UploadNote>, IUploadNoteRepository
    {
        public UploadNote GetUploadNote(int id, int id1, int id2)
        {
            return this.data.UploadNotes.Where(x => x.sectionid == id && x.subjectid == id1 && x.uploadid == id2).FirstOrDefault();
        }

        public List<UploadNote> GetUploadNotes(int id, int id1)
        {
            return this.data.UploadNotes.Where(x => x.sectionid == id && x.subjectid == id1).ToList();
        }
    }
}
