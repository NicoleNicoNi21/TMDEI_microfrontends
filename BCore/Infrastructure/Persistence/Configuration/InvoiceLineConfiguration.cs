// using BCore.Models;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;

// namespace BCore.Infrastructure.Persistence.Configuration;

// public class InvoiceLineConfiguration : IEntityTypeConfiguration<InvoiceLine>
// {
//     public void Configure(EntityTypeBuilder<InvoiceLine> builder)
//     {
//         builder.OwnsOne(e => e.Amount);
//         builder.OwnsOne(e => e.Vat);
//     }
// }