namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addassignment_s : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Assignment_s",
                c => new
                    {
                        assignmentid = c.Int(nullable: false, identity: true),
                        assignmenttitle = c.String(nullable: false, maxLength: 100, unicode: false),
                        filename = c.String(nullable: false, maxLength: 100, unicode: false),
                        directory = c.String(nullable: false, maxLength: 100, unicode: false),
                        postdate = c.DateTime(nullable: false),
                        duedate = c.DateTime(nullable: false),
                        sectionid = c.Int(nullable: false),
                        subjectid = c.Int(nullable: false),
                        studentid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.assignmentid);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Assignment_s");
        }
    }
}
