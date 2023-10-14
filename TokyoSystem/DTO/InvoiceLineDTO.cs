using TokyoSystem.Shared;

namespace TokyoSystem.DTO;

public class InvoiceLineDTO
{
    public string AccountCode { get; set; }
    public string CostCenter { get; set; }
    public Amount Amount { get; set; }
    public VAT Vat { get; set; }
    public double VatAmount { get; set; }
    public string Description { get; set; }
}