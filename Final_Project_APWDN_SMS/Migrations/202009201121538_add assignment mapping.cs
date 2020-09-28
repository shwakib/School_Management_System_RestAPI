namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addassignmentmapping : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Assignment_Map",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        assignmentid_t = c.Int(nullable: false),
                        assignmentid_s = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Assignment_Map");
        }
    }
}
