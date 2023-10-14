using BCore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BCore.Infrastructure.Persistence.Configuration;

public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
{
    public void Configure(EntityTypeBuilder<Invoice> builder)
    {
        builder.HasIndex(e => e.Number).IsUnique();
        builder.Navigation(e => e.Customer).AutoInclude();
        builder.OwnsMany(e => e.InvoiceLines, il =>
        {
            il.OwnsOne(c => c.Amount);
            il.OwnsOne(c => c.Vat);
        });
        //builder.Navigation(e => e.InvoiceLines).AutoInclude();
    }
}