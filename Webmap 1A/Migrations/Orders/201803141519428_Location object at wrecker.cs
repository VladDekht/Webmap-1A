namespace Webmap_1A.Migrations.Orders
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Locationobjectatwrecker : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Wreckers",
                c => new
                {
                    WreckerId = c.Int(nullable: false, identity: true),
                    PlateNum = c.String(nullable: false),
                    CurrentDriver_DriverId = c.Int(),
                    Location_Lat = c.Single(nullable: false),
                    Location_Lng = c.Single(nullable: false),
                })
                .PrimaryKey(t => t.WreckerId)
                .ForeignKey("dbo.Drivers", t => t.CurrentDriver_DriverId)
                .Index(t => t.CurrentDriver_DriverId);
            //AddColumn("dbo.Wreckers", "CurrentLocation_Lat", c => c.Single(nullable: false));
            //AddColumn("dbo.Wreckers", "CurrentLocation_Lng", c => c.Single(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Wreckers", "CurrentLocation_Lng");
            DropColumn("dbo.Wreckers", "CurrentLocation_Lat");
        }
    }
}
