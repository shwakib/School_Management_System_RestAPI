using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Final_Project_APWDN_SMS.Repository
{
    interface IUploadNoteRepository
    {
         List<UploadNote> GetUploadNotes(int id, int id1);
         UploadNote GetUploadNote(int id, int id1, int id2);
    }
}
