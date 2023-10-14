using BCore.Models;
using Microsoft.EntityFrameworkCore;

namespace BCore.Infrastructure.Persistence;

public class CustomerRepository : Repository<Customer, Guid>, ICustomerRepository
{
    private readonly BCoreContext Context;
    public CustomerRepository(BCoreContext context) : base(context)
    {
        Context = context;
    }

    public async Task<IEnumerable<Guid>> ListIds()
    {
        return await Context.Customers
            .Select(e => e.Id)
            .ToListAsync();
    }
}