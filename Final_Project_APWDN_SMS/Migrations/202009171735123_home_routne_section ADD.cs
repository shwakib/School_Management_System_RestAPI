namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class home_routne_sectionADD : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Homework",
                c => new
                    {
                        homeworkid = c.Int(nullable: false, identity: true),
                        filename = c.String(nullable: false, maxLength: 50, unicode: false),
                        directory = c.String(nullable: false, maxLength: 50, unicode: false),
                        postdate = c.DateTime(nullable: false),
                        duedate = c.DateTime(nullable: false),
                        subjectid = c.Int(nullable: false),
                        sectionid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.homeworkid);
            
            CreateTable(
                "dbo.Routines",
                c => new
                    {
                        routineid = c.Int(nullable: false, identity: true),
                        sectionid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.routineid);
            
            CreateTable(
                "dbo.Sections",
                c => new
                    {
                        sectionid = c.Int(nullable: false, identity: true),
                        sectionname = c.String(nullable: false, maxLength: 50, unicode: false),
                        classid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.sectionid);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Sections");
            DropTable("dbo.Routines");
            DropTable("dbo.Homework");
        }
    }
}
