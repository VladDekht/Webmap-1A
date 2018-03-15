namespace Webmap_1A.Migrations.Wreckers
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangedLatLngtoLocationobject : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Wreckers", "CurrentLocation_Lat", c => c.Single(nullable: false));
            AddColumn("dbo.Wreckers", "CurrentLocation_Lng", c => c.Single(nullable: false));
            DropColumn("dbo.Wreckers", "Location_Lat");
            DropColumn("dbo.Wreckers", "Location_Lng");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Wreckers", "Location_Lng", c => c.Single(nullable: false));
            AddColumn("dbo.Wreckers", "Location_Lat", c => c.Single(nullable: false));
            DropColumn("dbo.Wreckers", "CurrentLocation_Lng");
            DropColumn("dbo.Wreckers", "CurrentLocation_Lat");
        }
    }
}
