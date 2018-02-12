using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Webmap_1A.Models
{
    public class Address
    {
        public float Lat { get; set; }
        public float Lng { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public int HouseNum { get; set; }
        public string Zip { get; set; }
    }
}