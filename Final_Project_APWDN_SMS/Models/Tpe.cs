using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class Tpe
    {
        [Key]
        public int tpeid { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "teacherid can not be empty")]
        public string teacherid { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "studentid can not be empty")]
        public string studentid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "q1 can not be empty")]
        public int q1 { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "q2 can not be empty")]
        public int q2 { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "q3 can not be empty")]
        public int q3 { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "q4 can not be empty")]
        public int q4 { get; set; }

        [Column(TypeName = "varchar"), StringLength(1000)]
        [Required(ErrorMessage = "comment can not be empty")]
        public string comment { get; set; }

    }
}