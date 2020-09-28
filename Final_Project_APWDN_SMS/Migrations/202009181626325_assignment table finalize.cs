namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class assignmenttablefinalize : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Assignment_s", "assignmenttitle");
            DropColumn("dbo.Assignment_s", "duedate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Assignment_s", "duedate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Assignment_s", "assignmenttitle", c => c.String(nullable: false, maxLength: 100, unicode: false));
        }
    }
}
