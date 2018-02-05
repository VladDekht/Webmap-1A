using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Webmap_1A.Models
{
    public enum CallerType { Individual, Cop }
    public class Caller
    {
        public CallerType Type { get; set; }
        public string Name { get; set; }
        public string PhoneNum { get; set; }
    }
}