using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class GeneralNotice
    {
        [Key]
        public int noticeid { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "noticesubject can not be empty")]
        public string noticesubject { get; set; }

        [Column(TypeName = "varchar")]
        [Required(ErrorMessage = "noticedescription can not be empty")]
        public string noticedescription { get; set; }

        [Column(TypeName = "datetime")]
        [Required(ErrorMessage = "postdate can not be empty")]
        public System.DateTime postdate { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();
    }
}