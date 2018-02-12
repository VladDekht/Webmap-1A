using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Webmap_1A.Models
{
    public class Driver
    {
        [Key]
        public int DriverId { get; set; }
        [Required]
        public string Name { get; set; }
    }
}