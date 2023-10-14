using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BCore.Models;

public class InvoiceLine
{
    // [Key]
    // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    // public long Id { get; set; }
    public string AccountCode { get; set; }

    // [ForeignKey("Invoice")]
    // [Required]
    // public Guid InvoiceDocumentId { get; set; }
    public string? Item { get; set; }
    public string? CostCenter { get; set; }
    public string? Location { get; set; }
    public string? Department { get; set; }
    public Amount? Amount { get; set; }
    public VAT? Vat { get; set; }
    public double? VatAmount { get; set; }
    public string? Description { get; set; }

    public InvoiceLine(/* long id, */ string accountCode, /* Guid invoiceDocumentId, */ string item, string costCenter, string location, string department, Amount amount, VAT vat, double vatAmount, string description)
    {
        //this.Id = id;
        this.AccountCode = accountCode;
        //this.InvoiceDocumentId = invoiceDocumentId;
        this.Item = item;
        this.CostCenter = costCenter;
        this.Location = location;
        this.Department = department;
        this.Amount = amount;
        this.Vat = vat;
        this.VatAmount = vatAmount;
        this.Description = description;
    }

    public InvoiceLine() {}
}