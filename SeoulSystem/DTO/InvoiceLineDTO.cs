using SeoulSystem.Shared;

namespace SeoulSystem.DTO;

public class InvoiceLineDTO
{
    public string AccountCode { get; set; }

    public string Item { get; set; }

    public string Location { get; set; }

    public string Department { get; set; }

    public Amount Amount { get; set; }
    public VAT Vat { get; set; }
    public double VatAmount { get; set; }
    public string Description { get; set; }
}