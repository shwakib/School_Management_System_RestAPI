using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class Grade
    {
        [Key]
        public int gradeid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "sectionid can not be empty")]
        public int sectionid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "subjectid can not be empty")]
        public int subjectid { get; set; }

        [Column(TypeName = "varchar"), StringLength(20)]
        [Required(ErrorMessage = "studentid can not be empty")]
        public string studentid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "Quiz1 can not be empty")]
        public int quiz1 { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "Quiz2 can not be empty")]
        public int quiz2 { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "Assignment1 can not be empty")]
        public int assignment1 { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "half-yearly-grade can not be empty")]
        public int halfyearlymark { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "Quiz3 can not be empty")]
        public int quiz3 { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "Quiz4 can not be empty")]
        public int quiz4 { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "Assignment2 can not be empty")]
        public int assignment2 { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "final-grade can not be empty")]
        public int finalexammark { get; set; }

        [Column(TypeName = "varchar"), StringLength(10)]
        public string finalgrade { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();
    }
}