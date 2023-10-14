using TokyoSystem.Shared;

namespace TokyoSystem.DTO;

public class BCoreInvoiceLineDTO
{
    public string? AccountCode { get; set; }
    public string? InvoiceDocumentId { get; set; }
    public string? Item { get; set; }
    public string? CostCenter { get; set; }
    public string? Location { get; set; }
    public string? Department { get; set; }
    public BCoreAmount? Amount { get; set; }
    public VAT? Vat { get; set; }
    public double VatAmount { get; set; }
    public string? Description { get; set; }
}