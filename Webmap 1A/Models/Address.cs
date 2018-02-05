using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Webmap_1A.Models
{
    public class Address
    {
        public float Lat { get; set; }
        public float Lng { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public int HouseNum { get; set; }
        public string Zip { get; set; }
    }
}