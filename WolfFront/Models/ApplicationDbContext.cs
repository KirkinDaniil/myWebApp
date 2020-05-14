using Microsoft.EntityFrameworkCore;

namespace WolfApi.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tests { get; set; }
    }
}
