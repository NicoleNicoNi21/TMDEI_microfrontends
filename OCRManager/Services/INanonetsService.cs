using OCRManager.Events.Messages;
using OCRManager.Models;

public interface INanonetsService
{
    Task<IEnumerable<DocumentField>?> AnalyseDocument(PendingAnalysisMessage msg);
    Task<Invoice> FillInvoiceObject(PendingAnalysisMessage msg);
}