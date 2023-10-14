using Microsoft.AspNetCore.Mvc;
using TokyoSystem.DTO;
using TokyoSystem.Shared;

namespace TokyoSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoiceController : ControllerBase
{
    private readonly ILogger<InvoiceController> _logger;

    public InvoiceController(ILogger<InvoiceController> logger)
    {
        _logger = logger;
    }

    [HttpPost("Save")]
    public IEnumerable<InvoiceLineDTO> Save(IEnumerable<BCoreInvoiceLineDTO> invoiceLines)
    {
        throw new NotImplementedException();
    }

    [HttpPost("Map")]
    public InvoiceDTO Map(BCoreInvoiceDTO invoice)
    {
        var mappedInvoiceLines = invoice.InvoiceLines.Select(l => {
            var mappedLine = new InvoiceLineDTO();
            mappedLine.AccountCode =  l.AccountCode;
            mappedLine.CostCenter = l.CostCenter;
            mappedLine.Amount = new Amount();
            mappedLine.Amount.FinalValue = l.Amount.FinalValue;
            mappedLine.Vat = new VAT();
            mappedLine.Vat = l.Vat;
            mappedLine.VatAmount = l.VatAmount;
            mappedLine.Description = l.Description;

            return mappedLine;
        });

        var mappedInvoice = new InvoiceDTO();
        mappedInvoice.DocumentId = invoice.DocumentId;
        mappedInvoice.Number = invoice.Number;
        mappedInvoice.TotalAmount = invoice.TotalAmount;
        mappedInvoice.Currency = invoice.Currency;
        mappedInvoice.TransactionDate = invoice.TransactionDate;
        mappedInvoice.DueDate = invoice.DueDate;
        mappedInvoice.Description = invoice.Description;
        mappedInvoice.InvoiceLines = mappedInvoiceLines.ToArray();
        mappedInvoice.BookingStatus = invoice.BookingStatus;
        mappedInvoice.AccountSystemType = invoice.AccountSystemType;
        mappedInvoice.Customer = invoice.Customer;
        mappedInvoice.FileRelativePath = invoice.FileRelativePath;

        return mappedInvoice;
    }
}
