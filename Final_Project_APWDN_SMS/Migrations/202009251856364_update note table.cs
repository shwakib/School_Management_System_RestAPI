namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatenotetable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UploadNotes", "notetitle", c => c.String(nullable: false, maxLength: 100, unicode: false));
            AddColumn("dbo.UploadNotes", "postdate", c => c.DateTime(nullable: false));
            DropColumn("dbo.UploadNotes", "datetime");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UploadNotes", "datetime", c => c.DateTime(nullable: false));
            DropColumn("dbo.UploadNotes", "postdate");
            DropColumn("dbo.UploadNotes", "notetitle");
        }
    }
}
