using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class Section
    {
        [Key]
        public int sectionid { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "sectionname can not be empty")]
        public string sectionname { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "classid can not be empty")]
        public int classid { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();

    }
}