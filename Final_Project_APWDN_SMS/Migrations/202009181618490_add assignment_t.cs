namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addassignment_t : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Assignments", newName: "Assignment_t");
            AddColumn("dbo.Assignment_t", "assignmenttitle", c => c.String(nullable: false, maxLength: 100, unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Assignment_t", "assignmenttitle");
            RenameTable(name: "dbo.Assignment_t", newName: "Assignments");
        }
    }
}
