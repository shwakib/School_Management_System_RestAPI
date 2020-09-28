namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updategradetable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Grades", "studentid", c => c.String(nullable: false, maxLength: 20, unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Grades", "studentid", c => c.Int(nullable: false));
        }
    }
}
