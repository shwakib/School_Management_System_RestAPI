namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateteachertable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Teachers", "classid", c => c.Int(nullable: false));
            AddColumn("dbo.Teachers", "sectionid", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Teachers", "sectionid");
            DropColumn("dbo.Teachers", "classid");
        }
    }
}
