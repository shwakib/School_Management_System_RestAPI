using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class Timeslot
    {
        [Key]
        public int timeslotid { get; set; }

        [Column(TypeName = "varchar")]
        //[Required(ErrorMessage = "time can not be empty")]
        public string time { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "day can not be empty")]
        public string day { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "subjectid can not be empty")]
        public int subjectid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "sectionid can not be empty")]
        public int sectionid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "routineid can not be empty")]
        public int routineid { get; set; }
    }
}