namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class validation_student_update : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Students", "studentid", c => c.String(nullable: false, maxLength: 50, unicode: false));
            AlterColumn("dbo.Students", "studentname", c => c.String(nullable: false, maxLength: 50, unicode: false));
            AlterColumn("dbo.Students", "studentpassword", c => c.String(nullable: false, maxLength: 50, unicode: false));
            AlterColumn("dbo.Students", "studentdob", c => c.DateTime(nullable: false, storeType: "date"));
            AlterColumn("dbo.Students", "studentaddress", c => c.String(nullable: false, maxLength: 100, unicode: false));
            AlterColumn("dbo.Students", "studentemail", c => c.String(nullable: false, maxLength: 50, unicode: false));
            AlterColumn("dbo.Students", "studentbloodgroup", c => c.String(nullable: false, maxLength: 10, unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Students", "studentbloodgroup", c => c.String());
            AlterColumn("dbo.Students", "studentemail", c => c.String());
            AlterColumn("dbo.Students", "studentaddress", c => c.String());
            AlterColumn("dbo.Students", "studentdob", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Students", "studentpassword", c => c.String());
            AlterColumn("dbo.Students", "studentname", c => c.String());
            AlterColumn("dbo.Students", "studentid", c => c.String());
        }
    }
}
