namespace SeoulSystem.DTO;

public class InvoiceDTO
{
    public string? DocumentId { get; set; }
    public string? Number { get; set; }
    public double? TotalAmount { get; set; }

    public string? Currency { get; set; }
    public string? TransactionDate { get; set; }
    public string? DueDate { get; set; }
    public string? Description { get; set; }
    public ICollection<InvoiceLineDTO>? InvoiceLines { get; set; }
    public int? BookingStatus { get; set; }
    public string? AccountSystemType { get; set; }
    public CustomerDTO? Customer { get; set; }
    public string? FileRelativePath { get; set; }
}