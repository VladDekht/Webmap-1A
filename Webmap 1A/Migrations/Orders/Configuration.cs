namespace Webmap_1A.Migrations.Orders
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Webmap_1A.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<Webmap_1A.Models.Webmap_1AContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            MigrationsDirectory = @"Migrations\Orders";
        }

        protected override void Seed(Webmap_1A.Models.Webmap_1AContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.Orders.AddOrUpdate(
                m => m.Id, new Order
                {
                Caller = new Caller { Type = CallerType.Individual, Name = "Kirill", PhoneNum = "+375291234567" },
                    CurrentWrecker = new Wrecker { PlateNum = "4125 AH-7", CurrentDriver = { Name = "Jack" } },
                    PickFromAddress = new Address { Lat = 51.358013f, Lng = 12.391605f, City = "Leipzig", Street = "Bitterfelder", HouseNum = 12, Zip = "123456" },
                    TakeToAddress = new Address { Lat = 51.365013f, Lng = 12.385533f, City = "Leipzig", Street = "Eutritzscher", HouseNum = 1, Zip = "654321" },
                    OtherInfo = "Some other info"
                });
            context.SaveChanges();
        }
    }
}
