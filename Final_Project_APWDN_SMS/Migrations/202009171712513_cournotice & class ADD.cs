namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class cournoticeclassADD : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Classes",
                c => new
                    {
                        classid = c.Int(nullable: false, identity: true),
                        classname = c.String(nullable: false, maxLength: 50, unicode: false),
                    })
                .PrimaryKey(t => t.classid);
            
            CreateTable(
                "dbo.CourseNotices",
                c => new
                    {
                        noticeid = c.Int(nullable: false, identity: true),
                        noticesubject = c.String(nullable: false, maxLength: 50, unicode: false),
                        noticedescription = c.String(nullable: false, maxLength: 50, unicode: false),
                        sectionid = c.Int(nullable: false),
                        subjectid = c.Int(nullable: false),
                        classid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.noticeid);
            
            AlterColumn("dbo.Assignments", "filename", c => c.String(nullable: false, maxLength: 100, unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Assignments", "filename", c => c.String(nullable: false, maxLength: 8000, unicode: false));
            DropTable("dbo.CourseNotices");
            DropTable("dbo.Classes");
        }
    }
}
