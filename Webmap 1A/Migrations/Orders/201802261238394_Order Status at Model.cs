namespace Webmap_1A.Migrations.Orders
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class OrderStatusatModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Orders", "CurrentStatus", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Orders", "CurrentStatus");
        }
    }
}
