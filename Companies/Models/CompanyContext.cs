using Microsoft.EntityFrameworkCore;

namespace Companies.Models
{
    public class CompaniesContext : DbContext
    {
        public CompaniesContext(DbContextOptions<CompaniesContext> options)
            : base(options)
        {
        }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Address> Addresses { get; set; }
    }
}