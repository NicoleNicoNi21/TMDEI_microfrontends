namespace OCRManager.Models;

public class InvoiceLine
{
    public long Id { get; set; }
    public string AccountCode { get; set; }
    public string InvoiceDocumentId { get; set; }
    public string Item { get; set; }
    public string CostCenter { get; set; }
    public string Location { get; set; }
    public string Department { get; set; }
    public string Amount { get; set; }
    public string Vat { get; set; }
    public string VatAmount { get; set; }
    public string Description { get; set; }

    public InvoiceLine(long id, string accountCode, string invoiceDocumentId, string item, string costCenter, string location, string department, string amount, string vat, string vatAmount, string description)
    {
        this.Id = id;
        this.AccountCode = accountCode;
        this.InvoiceDocumentId = invoiceDocumentId;
        this.Item = item;
        this.CostCenter = costCenter;
        this.Location = location;
        this.Department = department;
        this.Amount = amount;
        this.Vat = vat;
        this.VatAmount = vatAmount;
        this.Description = description;
    }
}