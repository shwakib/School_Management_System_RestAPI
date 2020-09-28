using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class Teacher
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "teacherid can not be empty")]
        public string teacherid { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "teachername can not be empty")]
        public string teachername { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "teacher password can not be empty")]
        public string teacherpassword { get; set; }

        [Column(TypeName = "varchar"), StringLength(10)]
        [Required(ErrorMessage = "teacherbloodgroup can not be empty")]
        public string teacherbloodgroup { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "teacheremail can not be empty")]
        public string teacheremail { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "subjectid can not be empty")]
        public int subjectid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "classid can not be empty")]
        public int classid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "sectionid can not be empty")]
        public int sectionid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "teacherphone can not be empty")]
        public int teacherphone { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "teachersalary can not be empty")]
        public int teachersalary { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();
    }
}