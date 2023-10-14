using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BCore.Models;

public enum BookingStatusEnum
{
    Unknown = 0,
    Pending = 1,
    Recognised = 2,
    Validated = 3,
    Posted = 4,
    Rejected = 5
}

public class Invoice : IValidatableObject
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid DocumentId { get; set; }
    public string? Number { get; set; }
    public double? TotalAmount { get; set; }
    
    public string? Currency { get; set; }
    public DateTime? TransactionDate { get; set; }
    public DateTime? DueDate { get; set; }
    public string? Description { get; set; }
    public ICollection<InvoiceLine>? InvoiceLines { get; set; }

    public BookingStatusEnum BookingStatus { get; set; }
    
    public string AccountSystemType { get; set; }
    
    public Customer? Customer { get; set; }

    public string? FileRelativePath { get; set; }

    public Invoice(Guid documentId, string number, double totalAmount, string currency, DateTime transactionDate, 
        DateTime dueDate, string description, ICollection<InvoiceLine> invoiceLines, BookingStatusEnum bookingStatus, string accountSystemType, 
        Customer customer, string fileRelativePath)
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

    public Invoice()
    {
    }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        return new List<ValidationResult>();
    }
}
