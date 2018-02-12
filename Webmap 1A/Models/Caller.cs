using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Webmap_1A.Models
{
    public enum CallerType { Individual, Cop }
    public class Caller
    {
        public CallerType Type { get; set; }
        [Required]
        [Description("desc")]
        public string Name { get; set; }
        [Required]
        public string PhoneNum { get; set; }
    }
}