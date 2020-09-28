using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class Class
    {
        [Key]
        public int classid { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "classname can not be empty")]
        public string classname { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();
    }
}