using BCore.Models;

namespace BCore.Services;

public interface IInvoiceService
{
    Task<IEnumerable<Invoice>> FindAll();
    Task<Invoice> FindById(Guid id);
    Task<Invoice> Create(Invoice c);
    Task<Invoice> Update(Invoice c);
    Task<Invoice> UpdateStatus(string documentId, string status);
    Task<Invoice> PartialUpdate(InvoiceDTO c);
    Task<Invoice> Delete(Guid id);
    Task<IEnumerable<DocumentItem>> ListIds();
    Task<string> PostDocument(Guid id, Invoice c);
    Task<bool> RejectDocument(Guid id);
    Task<Invoice> SaveDocument(Invoice c);
}