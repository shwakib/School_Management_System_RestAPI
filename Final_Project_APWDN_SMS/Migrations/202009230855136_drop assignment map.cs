namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dropassignmentmap : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Assignment_s", "assignmentid_t", c => c.Int(nullable: false));
            DropTable("dbo.Assignment_Map");
        }
        
        public override void Down()
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
            
            DropColumn("dbo.Assignment_s", "assignmentid_t");
        }
    }
}
