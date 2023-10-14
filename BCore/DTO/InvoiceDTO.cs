using BCore.Models;

public class InvoiceDTO
{
    public string? DocumentId { get; set; }
    public string? Number { get; set; }
    public double? TotalAmount { get; set; }

    public string? Currency { get; set; }
    public string? TransactionDate { get; set; }
    public string? DueDate { get; set; }
    public string? Description { get; set; }
    public ICollection<InvoiceLine>? InvoiceLines { get; set; }
    public string? BookingStatus { get; set; }
    public string? AccountSystemType { get; set; }
    public string? Customer { get; set; }
    public string? FileRelativePath { get; set; }

    public InvoiceDTO(string documentId, string number, double totalAmount, string currency, string transactionDate,
        string dueDate, string description, ICollection<InvoiceLine> invoiceLines, string bookingStatus, string accountSystemType,
        string customer, string fileRelativePath)
    {
        DocumentId = documentId;
        Number = number;
        TotalAmount = totalAmount;
        Currency = currency;
        TransactionDate = transactionDate;
        DueDate = dueDate;
        Description = description;
        InvoiceLines = invoiceLines;
        BookingStatus = bookingStatus;
        AccountSystemType = accountSystemType;
        Customer = customer;
        FileRelativePath = fileRelativePath;
    }

    public InvoiceDTO()
    {
    }
}