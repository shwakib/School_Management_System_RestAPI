namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changegradetable_again : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Grades", "classid");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Grades", "classid", c => c.Int(nullable: false));
        }
    }
}
