using BCore.Infrastructure.Persistence;
using BCore.Models;

namespace BCore.Services;

public class CustomerService : ICustomerService
{
    private readonly CustomerRepository Repository;

    public CustomerService(CustomerRepository repository)
    {
        Repository = repository;
    }

    public async Task<IEnumerable<Customer>> FindAll()
    {
        return await Repository.FindAll();
    }

    public async Task<Customer> FindById(Guid id)
    {
        return await Repository.FindById(id);
    }

    public async Task<Customer> Create(Customer c)
    {
        return await Repository.Create(c);
    }

    public async Task<Customer> Update(Customer c)
    {
        return await Repository.Update(c.Id, c);
    }

    public async Task<Customer> Delete(Guid id)
    {
        return await Repository.Delete(id);
    }
    
    public async Task<IEnumerable<Guid>> ListIds()
    {
        return await Repository.ListIds();
    }
}