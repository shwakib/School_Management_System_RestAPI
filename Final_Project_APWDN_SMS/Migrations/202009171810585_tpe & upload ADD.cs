namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class tpeuploadADD : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Tpes",
                c => new
                    {
                        tpeid = c.Int(nullable: false, identity: true),
                        teacherid = c.String(nullable: false, maxLength: 50, unicode: false),
                        studentid = c.String(nullable: false, maxLength: 50, unicode: false),
                        q1 = c.Int(nullable: false),
                        q2 = c.Int(nullable: false),
                        q3 = c.Int(nullable: false),
                        q4 = c.Int(nullable: false),
                        comment = c.String(nullable: false, maxLength: 1000, unicode: false),
                    })
                .PrimaryKey(t => t.tpeid);
            
            CreateTable(
                "dbo.UploadNotes",
                c => new
                    {
                        uploadid = c.Int(nullable: false, identity: true),
                        directory = c.String(nullable: false, maxLength: 100, unicode: false),
                        filename = c.String(nullable: false, maxLength: 100, unicode: false),
                        datetime = c.DateTime(nullable: false),
                        sectionid = c.Int(nullable: false),
                        subjectid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.uploadid);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.UploadNotes");
            DropTable("dbo.Tpes");
        }
    }
}
