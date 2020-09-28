using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class CourseNotice
    {
        [Key]
        public int noticeid { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "noticesubject can not be empty")]
        public string noticesubject { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "noticedescription can not be empty")]
        public string noticedescription { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "sectionid can not be empty")]
        public int sectionid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "subjectid can not be empty")]
        public int subjectid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "classid can not be empty")]
        public int classid { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();

    }
}