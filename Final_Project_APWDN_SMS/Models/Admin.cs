using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class Admin
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "Admin ID can not be empty")]
        public string adminid { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "Admin Name can not be empty")]
        public string adminname { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "Admin Password can not be empty")]
        public string adminpassword { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();
    }
}