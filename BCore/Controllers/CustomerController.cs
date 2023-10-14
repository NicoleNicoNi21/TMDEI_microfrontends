using BCore.Models;
using BCore.Services;
using Microsoft.AspNetCore.Mvc;

namespace BCore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService Service;
    private readonly ILogger<CustomerController> _logger;

    public CustomerController(ICustomerService service, ILogger<CustomerController> logger)
    {
        Service = service;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IEnumerable<Customer>> GetAll()
    {
        return await Service.FindAll();
    }

    [HttpGet("{id}")]
    public async Task<Customer> Get(Guid id)
    {
        return await Service.FindById(id);
    }

    [HttpGet("List")]
    public async Task<IEnumerable<Guid>> ListIds()
    {
        return await Service.ListIds();
    }

    [HttpPost]
    public async Task<Customer> Create(Customer c)
    {
        return await Service.Create(c);
    }

    [HttpPut]
    public async Task<Customer> Update(Customer c)
    {
        return await Service.Update(c);
    }
}