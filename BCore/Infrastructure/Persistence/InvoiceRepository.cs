using BCore.Models;
using Microsoft.EntityFrameworkCore;

namespace BCore.Infrastructure.Persistence;

public class InvoiceRepository : Repository<Invoice, Guid>, IInvoiceRepository
{
    private readonly BCoreContext Context;
    public InvoiceRepository(BCoreContext context) : base(context)
    {
        Context = context;
    }

    public async Task<IEnumerable<DocumentItem>> ListIds()
    {
        return await Context.Invoices
            .Where(e => e.BookingStatus != BookingStatusEnum.Posted && e.BookingStatus != BookingStatusEnum.Rejected)
            .Select(e => new DocumentItem{Id=e.DocumentId, AccountingSystem=e.AccountSystemType})
            .ToListAsync();
    }
}