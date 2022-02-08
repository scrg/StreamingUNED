using API_UNED.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic; 
using System.Linq;
using System.Threading.Tasks;

namespace API_UNED.Context
{
    public class UNED_DbContext: DbContext
    {
        public UNED_DbContext(DbContextOptions<UNED_DbContext> options) : base(options)
        {

        }

        public DbSet<Usuarios> usuarios { get; set; }
    }
}
