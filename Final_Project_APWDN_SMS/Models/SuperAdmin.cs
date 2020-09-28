using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class SuperAdmin
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "varchar"), StringLength(50)]
        [Required(ErrorMessage = "Super Admin ID can not be empty")]
        public string superadminid { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "Super Admin Name can not be empty")]
        public string superadminname { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "Super Admin password can not be empty")]
        public string superadminpassword { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();
    }
}