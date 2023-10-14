using BCore.Models;

namespace BCore.Infrastructure.Persistence;

public interface IInvoiceRepository
{
    Task<IEnumerable<DocumentItem>> ListIds();
}