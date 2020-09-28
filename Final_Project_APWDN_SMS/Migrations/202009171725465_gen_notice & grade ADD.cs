namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class gen_noticegradeADD : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GeneralNotices",
                c => new
                    {
                        noticeid = c.Int(nullable: false, identity: true),
                        noticesubject = c.String(nullable: false, maxLength: 100, unicode: false),
                        noticedescription = c.String(nullable: false, maxLength: 8000, unicode: false),
                        postdate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.noticeid);
            
            CreateTable(
                "dbo.Grades",
                c => new
                    {
                        gradeid = c.Int(nullable: false, identity: true),
                        classname = c.String(nullable: false, maxLength: 50, unicode: false),
                        sectionname = c.String(nullable: false, maxLength: 50, unicode: false),
                        subjectname = c.String(nullable: false, maxLength: 50, unicode: false),
                        studentname = c.String(nullable: false, maxLength: 100, unicode: false),
                        quiz1 = c.Int(nullable: false),
                        quiz2 = c.Int(nullable: false),
                        assignment1 = c.Int(nullable: false),
                        halfyearlymark = c.Int(nullable: false),
                        quiz3 = c.Int(nullable: false),
                        quiz4 = c.Int(nullable: false),
                        assignment2 = c.Int(nullable: false),
                        finalexammark = c.Int(nullable: false),
                        finalgrade = c.String(maxLength: 10, unicode: false),
                    })
                .PrimaryKey(t => t.gradeid);
            
            AlterColumn("dbo.Students", "studentname", c => c.String(nullable: false, maxLength: 100, unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Students", "studentname", c => c.String(nullable: false, maxLength: 50, unicode: false));
            DropTable("dbo.Grades");
            DropTable("dbo.GeneralNotices");
        }
    }
}
