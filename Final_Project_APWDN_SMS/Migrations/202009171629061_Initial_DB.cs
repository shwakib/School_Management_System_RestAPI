namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial_DB : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Students",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        studentid = c.String(),
                        studentname = c.String(),
                        studentpassword = c.String(),
                        studentdob = c.DateTime(nullable: false),
                        studentphone = c.Int(nullable: false),
                        studentaddress = c.String(),
                        studentemail = c.String(),
                        studentbloodgroup = c.String(),
                        studentfees = c.Int(nullable: false),
                        classid = c.Int(nullable: false),
                        sectionid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Students");
        }
    }
}
