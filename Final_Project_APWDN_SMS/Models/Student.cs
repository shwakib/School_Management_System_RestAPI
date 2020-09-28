using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class Student
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "Student ID can not be empty")]
        public string studentid { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "Student Name can not be empty")]
        public string studentname { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "Student Password can not be empty")]
        public string studentpassword { get; set; }

        [Column(TypeName = "date")]
        [Required(ErrorMessage = "Student DOB can not be empty")]
        public System.DateTime studentdob { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "Student Phone can not be empty")]
        public int studentphone { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "Student Address can not be empty")]
        public string studentaddress { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "Student Email can not be empty")]
        public string studentemail { get; set; }

        [Column(TypeName = "varchar"), StringLength(10)]
        [Required(ErrorMessage = "Student BloodGroup can not be empty")]
        public string studentbloodgroup { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "Student Fees can not be empty")]
        public int studentfees { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "Student classid can not be empty")]
        public int classid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "Student sectionid can not be empty")]
        public int sectionid { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();
    }
}