using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Webmap_1A.Models
{
    public class Webmap_1AContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public Webmap_1AContext() : base("name=Webmap_1AContext")
        {
        }

        public System.Data.Entity.DbSet<Webmap_1A.Models.Order> Orders { get; set; }
    }
}
