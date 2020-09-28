using Final_Project_APWDN_SMS.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Repository
{
        public class Repository<T> : IRepository<T> where T : class
        {
            protected SMSDataContext data;

            public Repository()
            {
                this.data = new SMSDataContext();
            }
            public void Delete(int id)
            {
                data.Set<T>().Remove(GetByID(id));
                data.SaveChanges();
            }

            public void Edit(T entity)
            {
                data.Entry(entity).State = EntityState.Modified;
                data.SaveChanges();
            }

            public List<T> GetAll()
            {
                return data.Set<T>().ToList();
            }

            public T GetByID(int id)
            {
                return data.Set<T>().Find(id);
            }

            public void Insert(T entity)
            {
                data.Set<T>().Add(entity);
                data.SaveChanges();
            }
        }
    
}