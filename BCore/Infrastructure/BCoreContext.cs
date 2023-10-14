using BCore.Infrastructure.Persistence.Configuration;
using BCore.Models;
using Microsoft.EntityFrameworkCore;

namespace BCore.Infrastructure;

public class BCoreContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Invoice> Invoices { get; set; }

    // public BCoreContext() {}

    public BCoreContext(DbContextOptions<BCoreContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfiguration(new InvoiceConfiguration());
    }
}