using BCore.Infrastructure.Persistence;
using BCore.Models;

namespace BCore.Services;

public interface ICustomerService
{
    Task<IEnumerable<Customer>> FindAll();
    Task<Customer> FindById(Guid id);
    Task<Customer> Create(Customer c);
    Task<Customer> Update(Customer c);
    Task<Customer> Delete(Guid id);
    Task<IEnumerable<Guid>> ListIds();
}