namespace OCRManager.Models;

public class Invoice
{
    public string DocumentId { get; set; }
    public string Number { get; set; }
    public double TotalAmount { get; set; }
    public string Currency { get; set; }
    public DateTime TransactionDate { get; set; }
    public DateTime DueDate { get; set; }
    public string Description { get; set; }
    public ICollection<InvoiceLine> InvoiceLines { get; set; }
    public string AccountSystemType { get; set; }
    public string FileRelativePath { get; set; }

    public Invoice(string documentId, string number, double totalAmount, string currency, DateTime transactionDate, 
        DateTime dueDate, string description, ICollection<InvoiceLine> invoiceLines, string accountSystemType, 
        string fileRelativePath)
    {
        DocumentId = documentId;
        Number = number;
        TotalAmount = totalAmount;
        Currency = currency;
        TransactionDate = transactionDate;
        DueDate = dueDate;
        Description = description;
        InvoiceLines = invoiceLines;
        AccountSystemType = accountSystemType;
        FileRelativePath = fileRelativePath;
    }

    public Invoice()
    {
    }
}