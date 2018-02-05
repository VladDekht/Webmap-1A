using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Webmap_1A.Models;

namespace Webmap_1A.Services
{
    public class DataAccessService : DbContext
    {
        public DbSet<Order> Orders { get; set; } 
    }
}