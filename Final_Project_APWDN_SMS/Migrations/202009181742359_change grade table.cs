namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changegradetable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Grades", "classid", c => c.Int(nullable: false));
            AddColumn("dbo.Grades", "sectionid", c => c.Int(nullable: false));
            AddColumn("dbo.Grades", "subjectid", c => c.Int(nullable: false));
            AddColumn("dbo.Grades", "studentid", c => c.Int(nullable: false));
            DropColumn("dbo.Grades", "classname");
            DropColumn("dbo.Grades", "sectionname");
            DropColumn("dbo.Grades", "subjectname");
            DropColumn("dbo.Grades", "studentname");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Grades", "studentname", c => c.String(nullable: false, maxLength: 100, unicode: false));
            AddColumn("dbo.Grades", "subjectname", c => c.String(nullable: false, maxLength: 50, unicode: false));
            AddColumn("dbo.Grades", "sectionname", c => c.String(nullable: false, maxLength: 50, unicode: false));
            AddColumn("dbo.Grades", "classname", c => c.String(nullable: false, maxLength: 50, unicode: false));
            DropColumn("dbo.Grades", "studentid");
            DropColumn("dbo.Grades", "subjectid");
            DropColumn("dbo.Grades", "sectionid");
            DropColumn("dbo.Grades", "classid");
        }
    }
}
