using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class Subject
    {
        [Key]
        public int subjectid { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "Subject Name can not be empty")]
        public string subjectname { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "classid can not be empty")]
        public int classid { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();
    }
}