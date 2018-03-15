using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Webmap_1A.Models
{
    public class Webmap_1AContext : DbContext
    {    
        public Webmap_1AContext() : base("name=Webmap_1AContext")
        {
        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Wrecker> Wreckers { get; set; }
    }
}
