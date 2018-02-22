namespace Webmap_1A.Migrations.Orders
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Caller_Type = c.Int(nullable: false),
                        Caller_Name = c.String(nullable: false),
                        Caller_PhoneNum = c.String(nullable: false),
                        PickFromAddress_Lat = c.Single(nullable: false),
                        PickFromAddress_Lng = c.Single(nullable: false),
                        PickFromAddress_City = c.String(nullable: false),
                        PickFromAddress_Street = c.String(nullable: false),
                        PickFromAddress_HouseNum = c.Int(nullable: false),
                        PickFromAddress_Zip = c.String(),
                        TakeToAddress_Lat = c.Single(nullable: false),
                        TakeToAddress_Lng = c.Single(nullable: false),
                        TakeToAddress_City = c.String(nullable: false),
                        TakeToAddress_Street = c.String(nullable: false),
                        TakeToAddress_HouseNum = c.Int(nullable: false),
                        TakeToAddress_Zip = c.String(),
                        OtherInfo = c.String(),
                        CurrentWrecker_WreckerId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Wreckers", t => t.CurrentWrecker_WreckerId)
                .Index(t => t.CurrentWrecker_WreckerId);
            
            CreateTable(
                "dbo.Wreckers",
                c => new
                    {
                        WreckerId = c.Int(nullable: false, identity: true),
                        PlateNum = c.String(nullable: false),
                        CurrentDriver_DriverId = c.Int(),
                    })
                .PrimaryKey(t => t.WreckerId)
                .ForeignKey("dbo.Drivers", t => t.CurrentDriver_DriverId)
                .Index(t => t.CurrentDriver_DriverId);
            
            CreateTable(
                "dbo.Drivers",
                c => new
                    {
                        DriverId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.DriverId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Orders", "CurrentWrecker_WreckerId", "dbo.Wreckers");
            DropForeignKey("dbo.Wreckers", "CurrentDriver_DriverId", "dbo.Drivers");
            DropIndex("dbo.Wreckers", new[] { "CurrentDriver_DriverId" });
            DropIndex("dbo.Orders", new[] { "CurrentWrecker_WreckerId" });
            DropTable("dbo.Drivers");
            DropTable("dbo.Wreckers");
            DropTable("dbo.Orders");
        }
    }
}
