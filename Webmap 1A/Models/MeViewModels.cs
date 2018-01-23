using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Webmap_1A.Models
{
    // Models returned by MeController actions.
    public class GetViewModel
    {
        public string Hometown { get; set; }

        public int Age { get; set; }
    }
}