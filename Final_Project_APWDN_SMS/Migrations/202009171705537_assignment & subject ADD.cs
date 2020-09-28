namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class assignmentsubjectADD : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Assignments",
                c => new
                    {
                        assignmentid = c.Int(nullable: false, identity: true),
                        filename = c.String(nullable: false, maxLength: 8000, unicode: false),
                        directory = c.String(nullable: false, maxLength: 100, unicode: false),
                        postdate = c.DateTime(nullable: false),
                        duedate = c.DateTime(nullable: false),
                        sectionid = c.Int(nullable: false),
                        subjectid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.assignmentid);
            
            CreateTable(
                "dbo.Subjects",
                c => new
                    {
                        subjectid = c.Int(nullable: false, identity: true),
                        subjectname = c.String(nullable: false, maxLength: 50, unicode: false),
                        classid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.subjectid);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Subjects");
            DropTable("dbo.Assignments");
        }
    }
}
