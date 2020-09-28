using Final_Project_APWDN_SMS.Migrations;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class SMSDataContext:DbContext
    {
        public SMSDataContext()
        {
            Database.SetInitializer<SMSDataContext>(new MigrateDatabaseToLatestVersion<SMSDataContext, Configuration>());
        }

        virtual public DbSet<Student> Students { get; set; }

        virtual public DbSet<Admin> Admins { get; set; }

        virtual public DbSet<Assignment_t> Assignments_t { get; set; }

        virtual public DbSet<Assignment_s> Assignments_s { get; set; }

        virtual public DbSet<Subject> Subjects { get; set; }

        virtual public DbSet<Class> Classes { get; set; }

        virtual public DbSet<CourseNotice> CourseNotices { get; set; }

        virtual public DbSet<GeneralNotice> GeneralNotices { get; set; }

        virtual public DbSet<Grade> Grades { get; set; }

        virtual public DbSet<Homework> Homeworks { get; set; }

        virtual public DbSet<Routine> Routines { get; set; }

        virtual public DbSet<Section> Sections { get; set; }

        virtual public DbSet<SuperAdmin> SuperAdmins { get; set; }

        virtual public DbSet<Teacher> Teachers { get; set; }

        virtual public DbSet<Timeslot> Timeslots { get; set; }

        virtual public DbSet<Tpe> Tpes { get; set; }

        virtual public DbSet<UploadNote> UploadNotes { get; set; }
    }
}