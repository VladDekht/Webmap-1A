﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Webmap_1A.Models
{
    public class Wrecker
    {
        //public Location CurLocation { get; set; }
        [Key]
        public int WreckerId { get; set; }
        [Required]
        public string PlateNum { get; set; }
        public Driver CurrentDriver { get; set; }
        public Location CurrentLocation { get; set; }

    }
}