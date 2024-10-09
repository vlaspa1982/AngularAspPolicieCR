namespace Policie_BE_2.Data
{
    using Microsoft.EntityFrameworkCore;
    using Policie_BE_2.Models;

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<BtsData> BtsData { get; set; }
        public DbSet<GpsData> GpsData { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BtsData>()
                .OwnsOne(b => b.Position);

            
            modelBuilder.Entity<BtsData>()
                .OwnsMany(b => b.CellTowers); // owned type

           
        }
    }
}
