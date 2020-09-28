namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class super_teacher_timeslotADD : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SuperAdmins",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        superadminid = c.String(nullable: false, maxLength: 50, unicode: false),
                        superadminname = c.String(nullable: false, maxLength: 100, unicode: false),
                        superadminpassword = c.String(nullable: false, maxLength: 100, unicode: false),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.Teachers",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        teacherid = c.String(nullable: false, maxLength: 50, unicode: false),
                        teachername = c.String(nullable: false, maxLength: 100, unicode: false),
                        teacherpassword = c.String(nullable: false, maxLength: 100, unicode: false),
                        teacherbloodgroup = c.String(nullable: false, maxLength: 10, unicode: false),
                        teacheremail = c.String(nullable: false, maxLength: 100, unicode: false),
                        subjectid = c.Int(nullable: false),
                        teacherphone = c.Int(nullable: false),
                        teachersalary = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.Timeslots",
                c => new
                    {
                        timeslotid = c.Int(nullable: false, identity: true),
                        time = c.String(maxLength: 8000, unicode: false),
                        day = c.String(nullable: false, maxLength: 50, unicode: false),
                        subjectid = c.Int(nullable: false),
                        sectionid = c.Int(nullable: false),
                        routineid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.timeslotid);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Timeslots");
            DropTable("dbo.Teachers");
            DropTable("dbo.SuperAdmins");
        }
    }
}
