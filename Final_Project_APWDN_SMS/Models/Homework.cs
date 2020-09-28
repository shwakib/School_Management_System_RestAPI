using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class Homework
    {
        [Key]
        public int homeworkid { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "filename can not be empty")]
        public string filename { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "directory can not be empty")]
        public string directory { get; set; }

        [Column(TypeName = "datetime")]
        [Required(ErrorMessage = "postdate can not be empty")]
        public System.DateTime postdate { get; set; }

        [Column(TypeName = "datetime")]
        [Required(ErrorMessage = "duedate can not be empty")]
        public System.DateTime duedate { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "subjectid can not be empty")]
        public int subjectid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "sectionid can not be empty")]
        public int sectionid { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();
    }
}