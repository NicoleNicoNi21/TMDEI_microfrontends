using BCore.Events;
using BCore.Infrastructure.Persistence;
using BCore.Models;
using BCore.Services.External;
using Newtonsoft.Json;

namespace BCore.Services;

public class InvoiceService : IInvoiceService
{
    private readonly InvoiceRepository Repository;
    private readonly CustomerRepository CustomerRepository;
    private readonly IRabbitMqClientWrapper RabbitMqClient;
    private readonly IAccountingSystemService ASService;

    public InvoiceService(InvoiceRepository repository, CustomerRepository customerRepository, IRabbitMqClientWrapper rabbitMqClient, IAccountingSystemService asService)
    {
        Repository = repository;
        CustomerRepository = customerRepository;
        RabbitMqClient = rabbitMqClient;
        ASService = asService;
    }

    public async Task<IEnumerable<Invoice>> FindAll()
    {
        return await Repository.FindAll();
    }

    public async Task<Invoice> FindById(Guid id)
    {
        return await Repository.FindById(id);
    }

    public async Task<Invoice> Create(Invoice i)
    {
        var customer = await CustomerRepository.FindById(i.Customer.Id);

        if (customer == null)
        {
            throw new Exception($"Customer with ID {i.Customer.Id.ToString()} does not exist!");
        }

        i.Customer = customer;
        i.BookingStatus = BookingStatusEnum.Unknown;
        return await Repository.Create(i);
    }

    public async Task<Invoice> Update(Invoice i)
    {
        return await Repository.Update(i.DocumentId, i);
    }

    public async Task<Invoice> PartialUpdate(InvoiceDTO i)
    {
        var document = await Repository.FindById(Guid.Parse(i.DocumentId));
        if (document == null) {
            throw new Exception($"Document with ID '{i.DocumentId}' does not exist!");
        }

        if (i.Number != null) { document.Number = i.Number; }
        if (i.TotalAmount != 0.0) { document.TotalAmount = i.TotalAmount; }
        if (i.Currency != null) { document.Currency = i.Currency; }
        if (i.TransactionDate != null) { document.TransactionDate = DateTime.Parse(i.TransactionDate); }
        if (i.DueDate != null) { document.DueDate = DateTime.Parse(i.DueDate); }
        if (i.Description != null) { document.Description = i.Description; }
        if (i.InvoiceLines != null) { document.InvoiceLines = new List<InvoiceLine>(i.InvoiceLines); }

        return await Repository.Update(document.DocumentId, document);
    }

    public async Task<Invoice> UpdateStatus(string documentId, string status)
    {
        var document = await Repository.FindById(Guid.Parse(documentId));
        if (document == null)
        {
            throw new Exception($"Document with ID '{documentId}' does not exist!");
        }

        if (!Enum.IsDefined(typeof(BookingStatusEnum), status))
        {
            throw new Exception($"Status '{status}' does not exist!");
        }

        document.BookingStatus = (BookingStatusEnum)Enum.Parse(typeof(BookingStatusEnum), status);
        if (document.BookingStatus == BookingStatusEnum.Pending)
        {
            var jsonString = JsonConvert.SerializeObject(
                document,
                Newtonsoft.Json.Formatting.None,
                new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }
            );
            RabbitMqClient.Publish("PendingAnalysis", jsonString);
        }

        return await Repository.Update(document.DocumentId, document);
    }

    public async Task<Invoice> Delete(Guid id)
    {
        return await Repository.Delete(id);
    }

    public async Task<IEnumerable<DocumentItem>> ListIds()
    {
        return await Repository.ListIds();
    }

    public async Task<string> PostDocument(Guid id, Invoice c)
    {
        var document = await Repository.FindById(id);

        if (document == null)
        {
            throw new Exception($"Document with ID {id.ToString()} does not exist!");
        }

        var savedDocument = await SaveDocument(c);
        savedDocument.BookingStatus = BookingStatusEnum.Posted;
        await Update(savedDocument);
        return await ASService.MapDocumentData(savedDocument);
    }

    public async Task<bool> RejectDocument(Guid id)
    {
        var document = await Repository.FindById(id);

        if (document == null)
        {
            throw new Exception($"Document with ID {id.ToString()} does not exist!");
        }

        document.BookingStatus = BookingStatusEnum.Rejected;
        await this.Update(document);
        return true;
    }

    public async Task<Invoice> SaveDocument(Invoice c)
    {
        var document = await Repository.FindById(c.DocumentId);

        if (document == null)
        {
            throw new Exception($"Document with ID {c.DocumentId.ToString()} does not exist!");
        }

        var customer = await CustomerRepository.FindById(c.Customer.Id);

        if (customer == null)
        {
            throw new Exception($"Customer with ID {c.Customer.Id.ToString()} does not exist!");
        }

        document.Number = c.Number;
        document.TotalAmount = c.TotalAmount;
        document.Currency = c.Currency;
        document.TransactionDate = c.TransactionDate;
        document.DueDate = c.DueDate;
        document.Description = c.Description;
        document.InvoiceLines = c.InvoiceLines;
        document.Customer = customer;

        document.BookingStatus = BookingStatusEnum.Validated;
        return await Repository.Update(document.DocumentId, document);
    }
}