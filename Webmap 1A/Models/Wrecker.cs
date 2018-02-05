using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Webmap_1A.Models
{
    public class Wrecker
    {
        [Key]
        public int WreckerId { get; set; }
        public string PlateNum { get; set; }
        public Driver CurrentDriver { get; set; }
    }
}