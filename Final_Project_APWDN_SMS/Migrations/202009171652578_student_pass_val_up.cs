namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class student_pass_val_up : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Students", "studentpassword", c => c.String(nullable: false, maxLength: 100, unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Students", "studentpassword", c => c.String(nullable: false, maxLength: 50, unicode: false));
        }
    }
}
