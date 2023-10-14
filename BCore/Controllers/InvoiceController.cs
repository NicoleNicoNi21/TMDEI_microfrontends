using BCore.Models;
using BCore.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BCore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoiceController : ControllerBase
{
    private readonly IInvoiceService Service;
    private readonly ILogger<InvoiceController> _logger;

    public InvoiceController(IInvoiceService service, ILogger<InvoiceController> logger)
    {
        Service = service;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IEnumerable<Invoice>> GetAll()
    {
        return await Service.FindAll();
    }

    [HttpGet("{id}")]
    public async Task<Invoice> Get(Guid id)
    {
        return await Service.FindById(id);
    }

    [HttpGet("List")]
    public async Task<IEnumerable<DocumentItem>> ListIds()
    {
        return await Service.ListIds();
    }

    [HttpPost]
    public async Task<Invoice> Create(Invoice c)
    {
        return await Service.Create(c);
    }

    [HttpPost("Post/{id}")]
    public async Task<string> PostDocument(Guid id, Invoice c)
    {
        return await Service.PostDocument(id, c);
    }

    [HttpPost("Reject/{id}")]
    public async Task<bool> RejectDocument(Guid id)
    {
        return await Service.RejectDocument(id);
    }

    [HttpPost("Save")]
    public async Task<Invoice> SaveDocument(Invoice c)
    {
        return await Service.SaveDocument(c);
    }

    [HttpPut]
    public async Task<Invoice> Update(Invoice c)
    {
        return await Service.Update(c);
    }

    [HttpPut("BookingStatus/{id}")]
    public async Task<Invoice> UpdateStatus(string id, [FromQuery(Name = "status")]string status)
    {

        return await Service.UpdateStatus(id, status);
    }

    [HttpPatch]
    public async Task<Invoice> PartialUpdate(InvoiceDTO c)
    {
        return await Service.PartialUpdate(c);
    }
}