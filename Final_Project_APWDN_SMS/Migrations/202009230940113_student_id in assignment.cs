namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class student_idinassignment : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Assignment_s", "studentid", c => c.String(nullable: false, maxLength: 100, unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Assignment_s", "studentid", c => c.Int(nullable: false));
        }
    }
}
